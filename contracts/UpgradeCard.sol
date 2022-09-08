// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract upgradeCard {
    address private owner;

    struct User {
        uint purchaseDate;
        bool isUsing;
    }
    struct Card {
        string name;
        uint price;
        uint lifeSpan;
        mapping (address => User) users;
    }
    mapping(uint => Card) public cards;
    uint public types;

    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        types = 0;
        addCard("Basic", 0, 0);
    }

    /// ///

    function checkPurchase(address _userAddress, uint _id) public view returns (bool) {
        if (_id >= types) {
            return false;
        }
        if (cards[_id].lifeSpan == 0) {
            if (cards[_id].users[_userAddress].purchaseDate != 0 || cards[_id].price == 0) {
                return true;
            }
            return false;
        }
        return cards[_id].users[_userAddress].purchaseDate > block.timestamp - cards[_id].lifeSpan;
    }

    function showPurchaseDate(address _userAddress, uint _id) public view returns (uint) {
        if (!checkPurchase(_userAddress, _id)) {
            return 0;
        }
        return cards[_id].users[_userAddress].purchaseDate;
    }

    function showUsing(address _userAddress) public view returns (uint) {
        for (uint i = 1; i <= types; i++) {
            if (cards[i].users[_userAddress].isUsing && checkPurchase(_userAddress, i)) {
                return i;
            }
        }
        return 0;
    }

    ///

    function addCard(string memory _name, uint _price, uint _lifeSpan) public isOwner {
        Card storage card = cards[types];
        card.name = _name;
        card.price = _price;
        card.lifeSpan = _lifeSpan;
        types++;
    }

    function deleteCard(uint _id) public isOwner {
        require(0 < _id && _id < types, "Card does not exist");
        delete cards[_id];
        types--;
    }

    function purchaseCard(address _userAddress, uint _id) public {
        require(0 < _id && _id < types, "Card does not exist");
        cards[_id].users[_userAddress].purchaseDate = block.timestamp - 40; // normally delay time
    }

    function switchCard(address _userAddress, uint _id) public {
        require(0 <= _id && _id < types, "Card does not exist");
        require(checkPurchase(_userAddress, _id), "Not purchase yet");
        cards[ showUsing(_userAddress) ].users[_userAddress].isUsing = false;
        cards[_id].users[_userAddress].isUsing = true;
    }

    function removeCard(address _userAddress, uint _id) public {
        require(0 < _id && _id < types, "Card does not exist");
        require(checkPurchase(_userAddress, _id), "Not purchase yet");
        cards[_id].users[_userAddress].purchaseDate = 0;
        cards[_id].users[_userAddress].isUsing = false;
        switchCard(_userAddress, 0);
    }

}