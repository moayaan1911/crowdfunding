// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract CrowdFunding {
    struct Campaign {
        uint campaignId;
        string campaignTitle;
        string campaignDescription;
        string campaignImageCID;
        uint targetAmount;
        uint raisedAmount;
        uint endDate;
        bool status;
        address payable campaignOwner;
    }

    Campaign[] public campaigns;

    // map campaign to contributor address to amount contributed
    // mapping(uint => mapping(address => uint)) public contributions;

    struct Contribution {
        uint campaignId;
        uint contributionId;
        uint amount;
        uint date;
        address payable contributor;
    }

    Contribution[] public contributions;

    uint public campaignId = 0;

    function createCampaign(
        string memory _campaignTitle,
        string memory campaignDescription,
        string memory _campaignImageCID,
        uint _targetAmount,
        uint _duration
    ) public {
        campaigns.push(
            Campaign(
                campaignId,
                _campaignTitle,
                campaignDescription,
                _campaignImageCID,
                _targetAmount,
                0,
                block.timestamp * (1 days) + _duration,
                true,
                payable(msg.sender)
            )
        );
        campaignId++;
    }

    function contributeToCampaign(uint _campaignId) public payable {
        require(msg.value > 0, "Contribution amount must be greater than 0");
        require(
            campaigns[_campaignId].status == true,
            "Campaign is not active"
        );
        campaigns[_campaignId].raisedAmount += msg.value;
        contributions.push(
            Contribution(
                _campaignId,
                contributions.length,
                msg.value,
                block.timestamp * (1 days),
                payable(msg.sender)
            )
        );
    }

    function getAllContributionsForAParticularCampaign(
        uint _campaignId
    ) public view returns (Contribution[] memory) {
        Contribution[] memory _contributions = new Contribution[](
            contributions.length
        );
        uint counter = 0;
        for (uint i = 0; i < contributions.length; i++) {
            if (contributions[i].campaignId == _campaignId) {
                _contributions[counter] = contributions[i];
                counter++;
            }
        }
        return _contributions;
    }

    function claimFunds(uint _campaignId) public payable {
        require(
            campaigns[_campaignId].status == true,
            "Campaign is not active"
        );
        require(
            campaigns[_campaignId].campaignOwner == msg.sender,
            "Only campaign owner can claim funds"
        );
        require(
            campaigns[_campaignId].raisedAmount >=
                campaigns[_campaignId].targetAmount,
            "Campaign target amount not reached"
        );
        require(
            block.timestamp * (1 days) >= campaigns[_campaignId].endDate,
            "Campaign end date not reached"
        );
        campaigns[_campaignId].status = false;
        campaigns[_campaignId].campaignOwner.transfer(
            campaigns[_campaignId].raisedAmount
        );
    }

    function getAllCampaigns() public view returns (Campaign[] memory) {
        // returns all active campaigns which are NOT expired and NOT completed and NOT raised target amount
        Campaign[] memory _campaigns = new Campaign[](campaigns.length);
        uint counter = 0;
        for (uint i = 0; i < campaigns.length; i++) {
            if (
                campaigns[i].status == true &&
                block.timestamp * (1 days) <= campaigns[i].endDate &&
                campaigns[i].raisedAmount < campaigns[i].targetAmount
            ) {
                _campaigns[counter] = campaigns[i];
                counter++;
            }
        }
        return _campaigns;
    }

    function getCampaignById(
        uint _campaignId
    ) public view returns (Campaign memory) {
        return campaigns[_campaignId];
    }

    function deleteCampaign(uint _campaignId) public {
        require(
            campaigns[_campaignId].campaignOwner == msg.sender,
            "Only campaign owner can delete campaign"
        );
        campaigns[_campaignId].status = false;
    }

    function getOwnerOfACampaign(
        uint _campaignId
    ) public view returns (address) {
        return campaigns[_campaignId].campaignOwner;
    }
}
