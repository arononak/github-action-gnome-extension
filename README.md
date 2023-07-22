[<img src="https://github.com/arononak/github-actions-gnome-extension/blob/12c985b40d027f1f455199bb3c134bf209008de5/get-it.png" height="100" align="right">](https://extensions.gnome.org/extension/5973/github-actions/)

# Github Actions Gnome Extension 🧩

[![Build GNOME Extension](https://github.com/arononak/github-actions-gnome-extension/actions/workflows/main.yml/badge.svg)](https://github.com/arononak/github-actions-gnome-extension/actions/workflows/main.yml)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![GitHub release](https://img.shields.io/github/v/release/arononak/github-actions-gnome-extension)](https://github.com/arononak/github-actions-gnome-extension/releases/latest)

#### 🏞 Preview [MORE](./docs/SCREENSHOTS.md)

![](https://github.com/arononak/github-actions-gnome-extension/blob/main/docs/preview3.png?raw=true)

#### 🧮 Possible states

| State                   | Default                                                                                                                    | Colored                                                                                                                            |
|:------------------------|:--------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------:|
| NOT_INSTALLED_CLI       | ![](https://github.com/arononak/github-actions-gnome-extension/blob/main/docs/status/not_installed_cli.png?raw=true)       | ![](https://github.com/arononak/github-actions-gnome-extension/blob/main/docs/status/not_installed_cli_colored.png?raw=true)       |
| NOT_LOGGED              | ![](https://github.com/arononak/github-actions-gnome-extension/blob/main/docs/status/not_logged.png?raw=true)              | ![](https://github.com/arononak/github-actions-gnome-extension/blob/main/docs/status/not_logged_colored.png?raw=true)              |
| LOADING                 | ![](https://github.com/arononak/github-actions-gnome-extension/blob/main/docs/status/loading.png?raw=true)                 | ![](https://github.com/arononak/github-actions-gnome-extension/blob/main/docs/status/loading_colored.png?raw=true)                 |
| LOGGED_NOT_CHOOSED_REPO | ![](https://github.com/arononak/github-actions-gnome-extension/blob/main/docs/status/no_repo_entered.png?raw=true)         | ![](https://github.com/arononak/github-actions-gnome-extension/blob/main/docs/status/no_repo_entered_colored.png?raw=true)         |
| INCORRECT_REPOSITORY    | ![](https://github.com/arononak/github-actions-gnome-extension/blob/main/docs/status/incorrect_repo.png?raw=true)          | ![](https://github.com/arononak/github-actions-gnome-extension/blob/main/docs/status/incorrect_repo.png?raw=true)                  |
| IN_PROGRESS             | ![](https://github.com/arononak/github-actions-gnome-extension/blob/main/docs/status/in_progress.png?raw=true)             | ![](https://github.com/arononak/github-actions-gnome-extension/blob/main/docs/status/in_progress_colored.png?raw=true)             |
| REPO_WITHOUT_ACTIONS    | ![](https://github.com/arononak/github-actions-gnome-extension/blob/main/docs/status/repo_without_actions.png?raw=true)    | ![](https://github.com/arononak/github-actions-gnome-extension/blob/main/docs/status/repo_without_actions_colored.png?raw=true)    |
| COMPLETED_CANCELED      | ![](https://github.com/arononak/github-actions-gnome-extension/blob/main/docs/status/canceled.png?raw=true)                | ![](https://github.com/arononak/github-actions-gnome-extension/blob/main/docs/status/canceled_colored.png?raw=true)                |
| COMPLETED_FAILURE       | ![](https://github.com/arononak/github-actions-gnome-extension/blob/main/docs/status/failure.png?raw=true)                 | ![](https://github.com/arononak/github-actions-gnome-extension/blob/main/docs/status/failure_colored.png?raw=true)                 |
| COMPLETED_SUCCESS       | ![](https://github.com/arononak/github-actions-gnome-extension/blob/main/docs/status/success.png?raw=true)                 | ![](https://github.com/arononak/github-actions-gnome-extension/blob/main/docs/status/success_colored.png?raw=true)                 |

---

# 🔨 Manual configuration

Ubuntu
```bash
sudo apt update
sudo apt install gh
```
[https://github.com/cli/cli/blob/trunk/docs/install_linux.md](https://github.com/cli/cli/blob/trunk/docs/install_linux.md)

#### 🔒 Login

```bash
gh auth login --scopes user,repo,workflow
```
And configure owner and repository in extension settings.

#### 🔓 After logging in

Check the permissions with the command:
```bash
gh auth status
```

If any is missing, you can add it with the command:
```bash
gh auth refresh --scopes user,repo,workflow
```

---

# 🛠 Development

```mermaid
graph TD;
    prefs.js-->EXTENSION[GNOME EXTENSION]
    extension.js-->EXTENSION[GNOME EXTENSION]
    stylesheet.css-->EXTENSION[GNOME EXTENSION]
    metadata.json-->EXTENSION[GNOME EXTENSION]
    version.js[version.js - Generated by makefile]-->prefs.js;
    status_bar_indicator.js-->extension.js;
    utils.js-->widgets.js;
    utils.js-->local_cli_interface.js;
    utils.js-->prefs.js;
    utils.js-->status_bar_indicator.js;
    utils.js-->extension.js;
    widgets.js-->status_bar_indicator.js;
    widgets.js-->extension.js;
    local_cli_interface.js-->data_repository.js;
    data_repository.js-->extension.js;
```

#### ▶️ Start a gnome session in a window
```bash
make run
```

#### 🔨 Build gnome-extensions package

```bash
make build
```

---

# [✅️ TODO](./docs/TODO.md)

If you have any feedback, please contact me at arononak@gmail.com

---

# 📝 © Copyright 2023 Aron Onak

> **Warning**<br>
> The GitHub logo is a trademark of Microsoft.<br>
> This extension is not affiliated, funded, or in any way associated with Microsoft and GitHub.
