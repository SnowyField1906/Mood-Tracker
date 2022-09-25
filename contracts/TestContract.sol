// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract TestContract {
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    // //

    struct Mood {
        uint date;
        uint8 moodId;
    }
    struct User {
        address userAddress;
        mapping (uint => Mood) mood;
    }
    mapping(address => User) public users;

    function addMood(
        uint _date,
        uint8 _moodId,
        address _userAddress
    ) public {
        User storage user = users[_userAddress];
        user.mood[_date].date = _date;
        user.mood[_date].moodId = _moodId;
    }

    function viewMood(
        uint _date,
        address _userAddress
    ) public view returns (uint8) {
        User storage user = users[_userAddress];
        return user.mood[_date].moodId;
    }
    
}