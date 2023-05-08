/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

const { Clutter, GObject, St, Gio, GLib, Adw, Gtk } = imports.gi;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Main = imports.ui.main;
const ByteArray = imports.byteArray;
const ExtensionUtils = imports.misc.extensionUtils;

const GETTEXT_DOMAIN = 'github-actions-extension';
const Me = ExtensionUtils.getCurrentExtension();
const _ = ExtensionUtils.gettext;

function isEmpty(str) {
    return (!str || str.length === 0);
}

function _isLogged() {
    try {
        let [, stdout, stderr, status] = GLib.spawn_command_line_sync('gh auth token');

        if (status !== 0) {
            if (stderr instanceof Uint8Array) {
                stderr = ByteArray.toString(stderr);
            }

            logError(stderr);
            return false;
        }
        if (stdout instanceof Uint8Array) {
            stdout = ByteArray.toString(stdout);
        }

        return true;
    } catch (e) {
        logError(e);
        return false;
    }
}

async function _fetchStatus(owner, repo) {
    return new Promise(resolve => {
        try {
            let proc = Gio.Subprocess.new(
                ['gh', 'api', '-H', 'Accept: application/vnd.github+json', '-H', 'X-GitHub-Api-Version: 2022-11-28', '/repos/' + owner + '/' + repo + '/actions/runs'],
                Gio.SubprocessFlags.STDOUT_PIPE | Gio.SubprocessFlags.STDERR_PIPE
            );

            proc.communicate_utf8_async(null, null, (proc, res) => {
                let [, stdout, stderr] = proc.communicate_utf8_finish(res);

                if (proc.get_successful()) {
                    const response = JSON.parse(stdout);
                    const id = response["workflow_runs"][0]["status"].toString();

                    log(id);
                    resolve(id);
                } else {
                    throw new Error(stderr);
                }
            });
        } catch (e) {
            logError(e);
            resolve(null);
        }
    });
}

const Indicator = GObject.registerClass(
    class Indicator extends PanelMenu.Button {
        _init() {
            super._init(0.0, 'Github Action button', false);

            let icon = new St.Icon({ style_class: 'system-status-icon' });
            icon.gicon = Gio.icon_new_for_string(`${Me.path}/github.svg`);
            this.label = new St.Label({ style_class: 'github-actions-label', text: '...', y_align: Clutter.ActorAlign.CENTER, y_expand: true });

            let topBox = new St.BoxLayout({ style_class: 'panel-status-menu-box' });
            topBox.add_child(icon);
            topBox.add_child(this.label);
            this.add_child(topBox);

            let item = new PopupMenu.PopupMenuItem(_('Settings'));
            item.connect('activate', () => ExtensionUtils.openPrefs());
            this.menu.addMenuItem(item);
        }
    });

function initRefreshModule(settings, label) {
    setInterval(async () => {
        const owner = settings.get_string('owner');
        const repo = settings.get_string('repo');

        if (!isEmpty(owner) && !isEmpty(repo)) {
            let status = await _fetchStatus(owner, repo);
            if (status != null) {
                label.text = status.toString();
            }
        }
    }, 5000);
}

class Extension {
    constructor(uuid) {
        this._uuid = uuid;
        ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
    }

    enable() {
        this.settings = ExtensionUtils.getSettings('org.gnome.shell.extensions.github-actions');
        this._indicator = new Indicator();
        this.settings.bind('show-icon', this._indicator, 'visible', Gio.SettingsBindFlags.DEFAULT);
        Main.panel.addToStatusArea(this._uuid, this._indicator);

        initRefreshModule(this.settings, this._indicator.label);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
        this.settings = null;
    }
}

function init(meta) {
    return new Extension(meta.uuid);
}
