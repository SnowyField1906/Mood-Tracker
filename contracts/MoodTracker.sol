// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract MoodTracker {
    struct Mood {
        uint rating;
        uint emotions;
        uint activities;
        uint sleep;
        uint weather;
        string journal;
    }
    uint public number;

    constructor() {
        number = 0;
    }

    struct User {
        uint time;
        mapping(uint => Mood) moods;
    }
    mapping(address => User) public users;

    function addMood (uint _input, string memory _journal) public {
        users[msg.sender].moods[number].rating = _input/10000;
        users[msg.sender].moods[number].emotions = (_input/1000)%10;
        users[msg.sender].moods[number].activities = (_input/100)%10;
        users[msg.sender].moods[number].sleep = (_input/10)%10;
        users[msg.sender].moods[number].weather = _input%10;
        users[msg.sender].moods[number].journal = _journal;
        users[msg.sender].time = block.timestamp;
        number++;
    }

    function showMood (uint _time) public view returns (uint, uint, uint, uint, uint, string memory) {
        return (users[msg.sender].moods[_time].rating, users[msg.sender].moods[_time].emotions, users[msg.sender].moods[_time].activities, users[msg.sender].moods[_time].sleep, users[msg.sender].moods[_time].weather, users[msg.sender].moods[_time].journal);
    }
}