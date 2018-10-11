# Stream HLS from a Browser

## Overview
This project is an attempt to implementat an HLS stream out of the browser. It is build upon two core browser technologies:
* [MediaStream Recording](https://www.w3.org/TR/mediastream-recording)
* [WebAssembly](https://webassembly.org/)

The idea is to construct webm blobs (opus/h264), transcode them to ts segments (aac/h264) in the browser and upload to a remote server.

## Limitations
The project started as an attempt to stream HLS from the browser. However, it turned out that such browser based streaming is **not possible**. The official W3C documentation for MediaStream Recording offers an [explanation](https://www.w3.org/TR/mediastream-recording/#mediarecorder-methods):

> The UA MUST record stream in such a way that the original Tracks can be retrieved at playback time. When multiple Blobs are returned (because of timeslice or requestData()), the individual Blobs need not be playable, but the combination of all the Blobs from a completed recording MUST be playable.

In practice this means, that ffmpeg will fail when transcoding the recorded blobs. It also means, that even if the blobs would be just uploaded to a remote location in an attempt to be transcoded there, this would fail as well.

## Purpose
* Demonstration of a limitation in MediaStream Recording API
* Archive
