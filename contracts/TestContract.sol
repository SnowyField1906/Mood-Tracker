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

    function isLeap(uint _year) public pure returns (uint8) {
        return (_year % 4 == 0 && (_year % 100 != 0 || _year % 400 == 0)) ? 1 : 0;
    }

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
        uint _begin,
        uint _end,
        address _userAddress
    ) public view returns (uint8[] memory) {
        User storage user = users[_userAddress];
        uint count = 0;
        uint8[] memory moodArray = new uint8[](_end - _begin);
        for (uint i = _begin; i < _end; i++) {
            moodArray[count++] = user.mood[i].moodId;
        }
        return moodArray;
    }
}