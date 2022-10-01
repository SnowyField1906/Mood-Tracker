// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract MoodTracker {
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    // //

    struct Emotion {
        string emotion;
        string category;
    }
    struct Activity {
        string activity;
    }
    struct Sleep {
        uint8 hour;
    }
    struct Weather {
        string weather;
    }
    struct Mood {
        uint8 emotionNumber;
        Emotion[] emotion;
        uint8 activityNumber;
        Activity[] activity;
        uint8 sleepNumber;
        Sleep[] sleep;
        uint8 weatherNumber;
        Weather[] weather;
        string journal;
    }
    struct User {
        uint day;
        Mood[] mood;
    }
    mapping(address => User) public users;

    function addMood(
        uint _day,
        uint8 _emotionNumber,
        string[] memory _emotion,
        string[] memory _category,
        uint8 _activityNumber,
        string[] memory _activity,
        uint8 _sleepNumber,
        uint8 _hour,
        uint8 _weatherNumber,
        string[] memory _weather,
        string memory _journal
    ) public {
        User storage user = users[msg.sender];
        user.day = _day;
        user.mood[_day].emotionNumber = _emotionNumber;
        user.mood[_day].activityNumber = _activityNumber;
        user.mood[_day].sleepNumber = _sleepNumber;
        user.mood[_day].weatherNumber = _weatherNumber;

        for (uint8 i = 0; i < _emotionNumber; i++) {
            user.mood[_day].emotion.push(Emotion(_emotion[i], _category[i]));
        }
        for (uint8 i = 0; i < _activityNumber; i++) {
            user.mood[_day].activity.push(Activity(_activity[i]));
        }
        for (uint8 i = 0; i < _sleepNumber; i++) {
            user.mood[_day].sleep.push(Sleep(_hour));
        }
        for (uint8 i = 0; i < _weatherNumber; i++) {
            user.mood[_day].weather.push(Weather(_weather[i]));
        }
        user.mood[_day].journal = _journal;
    }

    function viewMood(uint _day) public view returns (Mood memory) {
        return users[msg.sender].mood[_day];
    }
    
}