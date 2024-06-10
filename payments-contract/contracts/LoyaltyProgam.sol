// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract LoyaltyProgram {
    mapping(address => uint256) public points;

    function redeemPoints(uint256 _points) public {
        require(points[msg.sender] >= _points, "Insufficient points");
        points[msg.sender] -= _points;
    }

    function addPoints(uint256 _points) public {
        points[msg.sender] += _points;
    }

    function getPoints() public view returns (uint256) {
        return points[msg.sender];
    }
}
