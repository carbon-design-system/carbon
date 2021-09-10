## Development on Windows 10

This is a brief guide to getting a Windows environment set up for Carbon
development. We'll be using the
[Windows Subsystem](https://docs.microsoft.com/en-us/windows/wsl/about) for
Linux with an Ubuntu install 👐🏽.

Note: if you have native Windows versions of Yarn, NVM/Node, Python and the like
[Windows automatically imports your paths into your WSL by default](https://github.com/Microsoft/WSL/issues/1890)
(running `echo $PATH` can confirm this), this can be a source of weird bugs when
WSL is attempting to run Windows versions of -- for example Python -- instead of
your WSL version. 🤦🏽‍♂️ That interop is fine (using Windows executables via WSL),
but can be unexpected.

1. Install Ubuntu 18.04 LTS via the Microsoft Store
2. Run the Ubuntu application -- which should look like a familiar bash terminal
   (the remainder of the guide will happen here 👍🏽)
3. Setup a user name and password when prompted
4. Update your Ubuntu repositories `sudo apt-get update`
5. Install the build-essential package `sudo apt install build-essential`
6. Install nvm via their install and update script
   [found here](https://github.com/nvm-sh/nvm#install--update-script)
7. Source your newly NVMed .bashrc `source ~/.bashrc`
8. Install latest LTS Node release `nvm install --lts`
9. Install Python 2 `sudo apt install python2-minimal`
10. Install Yarn by running:
    - `curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`
    - `echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`
    - `sudo apt-get update && sudo apt-get install yarn`
11. Enable `chmod`/`chown` functionality (allowing you to `git clone...` from
    WSL)
    - `sudo umount /mnt/c`
    - `sudo mount -t drvfs C: /mnt/c -o metadata`
12. Increase Linux OS limits to avoid errors in build process (limited by WSL by
    default).
    - https://muhammadtriwibowo.medium.com/set-permanently-ulimit-n-open-files-in-ubuntu-4d61064429a
    - `ulimit -l 65536` -> Increases the maximum amount of locked memory
      available to OS
    - `ulimit -n 1048576` -> Increases the maximum amount of files that can be
      in an open state
13. Change directories into your projects folder
    `cd /mnt/c/Users/{username}/projects` (Only an example, use whatever you'd
    like)
14. Clone our repo
    `git clone https://github.com/carbon-design-system/carbon.git`
15. In the root folder of your freshly cloned repo install and build
    - `yarn install`
    - `yarn build`
