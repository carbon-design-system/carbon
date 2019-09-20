# Virtual machines

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Intro](#intro)
- [VirtualBox](#virtualbox)
  - [Installation](#installation)
  - [Download VM images](#download-vm-images)
  - [Configure VirtualBox](#configure-virtualbox)
  - [Create new VM](#create-new-vm)
  - [Pro tips](#pro-tips)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Intro

If you're looking to install a virtual machine for cross-browser testing, this
guide is for you.

## VirtualBox

### Installation

There are many virtualization products out there but VirtualBox is free, so
let's use that. You can download it here: https://www.virtualbox.org/.

### Download VM images

Microsoft provides free test VM images that you can use with VirtualBox. Since
IE11 is our favorite, you can go here to download the "IE11 on Win81 (x86)" VM:
https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/

Select VirtualBox as the platform and download the ZIP.

_Note: it says the VMs expire after 90 days, but it appears that is not
enforced._

You can save the ZIP wherever you'd like, but it's best to save it in an
expected location so when you need to free up disk space on your machine, you
know where to go to delete unused VMs. Create `/VirtualBox/Images` directories
in your home directory and save the ZIP there. Unpack the ZIP.

### Configure VirtualBox

Open VirtualBox and open Preferences. Select `/Users/USERNAME/VirtualBox` as
your default machine folder.

### Create new VM

Double click the `IE11 - Win81.ovf` file from the folder that you unpacked to
import the VM into VirtualBox. By default this uses 4 GB of RAM and uses a
VirtualBox Disk Image (VDI) so the VM will only use physical disk space as
needed.

### Pro tips

- When using the VM, you may need to `View > Virtual Screen 1` and select a
  different scale
- By default, the left `CMD` key removes the "input trap" from the VM so you can
  interact with your primary OS
- Remember to use `CTRL` instead of `CMD` for selecting, copying, cutting,
  pasting, etc. on Windows VMs
