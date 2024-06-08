// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Payments {
    struct Payment {
        uint256 amount;
        uint256 timestamp;
        string message;
        address sender;
        address recipient;
    }

    Payment[] public history;

    function pay(string memory message, address recipient) public payable {
        require(msg.value > 0, "Payment amount must be greater than zero");
        require(recipient != address(0), "Invalid recipient address");

        Payment memory payment = Payment(
            msg.value,
            block.timestamp,
            message,
            msg.sender,
            recipient
        );

        history.push(payment);
        payable(recipient).transfer(msg.value);
    }

    constructor() {}
}
