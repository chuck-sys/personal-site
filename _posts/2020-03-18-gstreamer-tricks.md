---
layout: post
title: "gstreamer tips and tricks"
date: "2020-03-18 14:45"
excerpt: "Some gstreamer tips and tricks for the soul"
category: gstreamer
tags: [gstreamer,linux,command-line]
---

## Streaming video from internet to /dev/video0

For cases where you want to use your desktop to do face-to-face meetings with
others but don't want to go out and buy a webcam, this is for you.

Prerequisites:

- A phone
- A linux machine with v4l2loopback installed
- gstreamer

To start, install an app on your phone that streams video from the phone's IP
address (for Android users, there is IP Webcam). Start the server up. Pay
attention to the URL that streams raw video (for IP Webcam, it is `/video`).

To activate the v4l2loopback kernel module, run the following command:

```bash
sudo modprobe v4l2loopback
```

You may notice that it automatically creates a new loopback device (usually
`/dev/video0` if you don't have other webcams plugged in).

Run gstreamer:

```bash
gst-launch-0.10 souphttpsrc location="http://<URL>/video" is-live=true !
	multidec ! decodebin ! v4l2sink device=/dev/video0
```

**Note:** You can replace the video URL with any video you like and have that
video stream into `/dev/video0`.

## Streaming audio from internet to computer

For cases where you don't just want video from your phone, but audio as well,
this is for you.

Prerequisites:

- Everything above that concerns a phone and gstreamer

This time you don't need to use v4l2loopback since we are streaming the audio
directly to our device. You will be able to hear the audio in your headphones.

After setting up the server for your phone, pay attention to the URL for the
audio streams (there are 2/3 for IP Webcam: `/audio.wav`, `/audio.opus`,
`/audio.aac`, depending on if your device supports them; we will use
`/audio.wav`).

Run gstreamer:

```bash
gst-launch-0.10 souphttpsrc location="http://<URL>/audio.wav" is-live=true !
	decodebin ! autoaudiosink
```

## Streaming audio from PulseAudio device to computer

For the cases where everyone tells you to use
[meet.google.com](https://meet.google.com) for meetings and you have a USB microphone
and want to join but for some reason Google doesn't recognize your USB
microphone but for some other reason recognizes the sounds your device makes
(system monitor) **even though** other sites that test microphone have no
trouble recognizing both the system monitor and the USB microphone at the same
time.

Prerequisites:

- A USB microphone
- PulseAudio system
- gstreamer

Plug in your microphone. We have to find the device's name. Run the command:

```bash
pactl list | grep -A2 'Source #' | grep 'Name: ' | cut -d" " -f2
```

You will see a couple of devices listed. Pick the one you think is correct.
Usually the correct one is prefixed with `alsa_input`.

```console
alsa_input.usb-BLUE_MICROPHONE_Blue_Snowball_SUGA_2019_11_14_29386-00.mono-fallback
alsa_output.pci-0000_00_1b.0.analog-stereo.monitor
```

Copy the entire string and run the following command:

```bash
gst-launch-0.10 pulsesrc device="<YOUR DEVICE NAME HERE>" ! autoaudiosink
```
