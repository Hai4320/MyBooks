import React, { useState, useRef } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator, LayoutAnimation, UIManager, Image } from "react-native";
import Video from "react-native-video";
import Slider from "@react-native-community/slider";
import { toHHMMSS } from "../component/utils";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from "../constants"

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);
  import { StyleSheet, Platform } from "react-native";
  const styles = StyleSheet.create({
  rowContainer: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconContainer: {
    alignSelf: "center",
    position: "relative",
  },
  playBtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  sliderContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    width: "100%",
  },
  slider: {
    height: 30,
    width: "100%",
    marginBottom: 3,
  },
  durationContainer: { flexDirection: "row", justifyContent: "space-between" },
  actionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    marginBottom: 10,
  },
  crossLine: {
    position: "absolute",
    transform: [ {rotate: "-60deg"} ],
    top: 15,
    left: -1,
    width: 30,
    height: 1,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 2,
  },
  volumeControlContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.main,
    paddingHorizontal: 16,
    borderRadius: 50,
    ...Platform.select({
      ios: {
        height: 44
      },
      android: {
        height: 40
      },
    }),
  },
  volumeSlider: {
    width: '50%',
  },
  timeText: {
    color: COLORS.white,
    fontSize: 18,
  },
  playIcon: { fontSize: 30  ,color: COLORS.white,},
 
});

const volumeControlTime = 3000;
 
export const AudioPlayer = (props) => {
  const { url, style, repeatOnComponent, repeatOffComponent } = props;
  const [paused, setPaused] = useState(true);

  const videoRef = useRef(null);
  const controlTimer = useRef(0);

  const [totalLength, setTotalLength] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [volumeControl, setVolumeControl] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const onSeek = (time) => {
    time = Math.round(time);
    videoRef && videoRef.current.seek(time);
    setCurrentPosition(time);
    setPaused(false);
  };

  const fixDuration = (data) => {
    setLoading(false);
    setTotalLength(Math.floor(data.duration));
  };

  const setTime = (data) => {
    setCurrentPosition(Math.floor(data.currentTime));
  };

  const togglePlay = () => {
    setPaused(!paused);
  };

  const toggleRepeat = () => {
    setRepeat(!repeat);
  };

  const toggleVolumeControl = () => {
    setVolumeTimer(!volumeControl);
    LayoutAnimation.easeInEaseOut();
    setVolumeControl(!volumeControl);
  };

  const setVolumeTimer = (setTimer = true) => {
    clearTimeout(controlTimer.current);
    controlTimer.current = 0;
    if (setTimer) {
      controlTimer.current = setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        setVolumeControl(false);
      }, volumeControlTime);
    }
  };

  const onVolumeChange = (vol) => {
    setVolumeTimer();
    setVolume(vol);
  };

  const resetAudio = () => {
    if (!repeat) {
      setPaused(true);
    }
    setCurrentPosition(0);
  };

  return (
    <View style={{width: '100%', backgroundColor: COLORS.dodgerblue}}>
      <Video
        source={{ uri: url }}
        ref={videoRef}
        playInBackground={true}
        audioOnly={true}
        playWhenInactive={true}
        paused={paused}
        onEnd={resetAudio}
        onLoad={fixDuration}
        onLoadStart={() => setLoading(true)}
        onProgress={setTime}
        volume={volume}
        repeat={repeat}
        style={{ height: 0, width: 0 }}
      />

      <View>
        <View style={styles.rowContainer}>
          {loading && (
            <View style={{ margin: 18 }}>
              <ActivityIndicator size="large" color={COLORS.white}/>
            </View>
          ) || (
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
                style={styles.iconContainer}
                onPress={toggleRepeat}
              >
                <Ionicons name={"repeat-outline"} style={styles.playIcon}/>
                {!repeat && <View style={styles.crossLine}/>}
              </TouchableOpacity>
              <TouchableOpacity style={[styles.iconContainer, styles.playBtn]} onPress={togglePlay}>
                <Ionicons
                  name={paused ? "play" : "pause"}
                  style={styles.playIcon}
                />
              </TouchableOpacity>
              <View
                style={[
                  styles.volumeControlContainer,
                  volumeControl ? { paddingHorizontal: 12 } : { backgroundColor: "transparent" }
                ]}
              >
                <TouchableOpacity
                  hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
                  style={styles.iconContainer}
                  onPress={toggleVolumeControl}
                >
                  <Ionicons
                    name={volume === 0 ? "volume-mute" : "volume-medium"}
                    style={styles.playIcon}
                  />
                </TouchableOpacity>
                {volumeControl && (
                  <Slider
                    style={styles.volumeSlider}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor={COLORS.white}
                    maximumTrackTintColor={'grey'}
                    thumbTintColor={COLORS.white}
                    onSlidingComplete={onVolumeChange}
                    value={volume}
                  />
                )}
              </View>
            </View>
          )}

          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={Math.max(totalLength, 1, currentPosition + 1)}
              minimumTrackTintColor={COLORS.white}
              maximumTrackTintColor={'grey'}
              onSlidingComplete={onSeek}
              value={currentPosition}
            />
            <View style={styles.durationContainer}>
              <Text style={styles.timeText}>
                {toHHMMSS(currentPosition)}
              </Text>
              <Text style={styles.timeText}>
                {toHHMMSS(totalLength)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
