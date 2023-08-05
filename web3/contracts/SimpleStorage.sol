// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

contract SimpleStorage {
    uint256 num;

    function set(uint256 _num) public {
        num = _num;
    }

    function get() public view returns (uint256) {
        return num;
    }
}

// Deployed on Mumbai on :- 0x964777d1CAB2f139D826ac51E416A25063B86612
// abi :- [{"inputs":[],"name":"get","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_num","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"}]
