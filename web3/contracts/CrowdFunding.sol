// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;
import "hardhat/console.sol";

contract CrowdFunding {
    struct Campaign {
        uint campaignId;
        string campaignTitle;
        string campaignDescription;
        string campaignImageCID;
        uint targetAmount;
        uint raisedAmount;
        uint startAt;
        uint endAt;
        bool status;
        address payable campaignOwner;
    }

    Campaign[] public campaigns;

    struct Contribution {
        uint campaignId;
        uint contributionId;
        uint amount;
        uint date;
        address payable contributor;
    }

    Contribution[] public contributions;

    uint private campaignId = 0;

    event CampaignCreated(uint campaignId, uint createdAt);

    function createCampaign(
        string memory _campaignTitle,
        string memory _campaignDescription,
        string memory _campaignImageCID,
        uint _targetAmount,
        uint _duration
    ) public {
        require(_targetAmount > 0, "Target amount should be greater than 0");
        require(_duration > 0, "Duration should be greater than 0");
        campaigns.push(
            Campaign(
                campaignId,
                _campaignTitle,
                _campaignDescription,
                _campaignImageCID,
                _targetAmount,
                0,
                block.timestamp,
                block.timestamp + _duration,
                true,
                payable(msg.sender)
            )
        );
        emit CampaignCreated(campaignId, block.timestamp);
        campaignId++;
    }

    function totalCampaigns() public view returns (uint) {
        return campaigns.length;
    }

    function getParticularCampaign(
        uint _campaignId
    ) public view returns (Campaign memory) {
        return campaigns[_campaignId];
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        return campaigns;
    }

    function getActiveCampaigns() public view returns (Campaign[] memory) {
        uint activeCount = 0;
        for (uint i = 0; i < campaigns.length; i++) {
            if (campaigns[i].status == true) {
                activeCount++;
            }
        }

        Campaign[] memory activeCampaigns = new Campaign[](activeCount);
        uint counter = 0;
        for (uint i = 0; i < campaigns.length; i++) {
            if (campaigns[i].status == true) {
                activeCampaigns[counter] = campaigns[i];
                counter++;
            }
        }
        return activeCampaigns;
    }

    function getInactiveCampaigns() public view returns (Campaign[] memory) {
        uint inactiveCount = 0;
        for (uint i = 0; i < campaigns.length; i++) {
            if (campaigns[i].status == false) {
                inactiveCount++;
            }
        }

        Campaign[] memory inactiveCampaigns = new Campaign[](inactiveCount);
        uint counter = 0;
        for (uint i = 0; i < campaigns.length; i++) {
            if (campaigns[i].status == false) {
                inactiveCampaigns[counter] = campaigns[i];
                counter++;
            }
        }
        return inactiveCampaigns;
    }

    function deleteCampaign(uint _campaignId) public {
        require(
            campaigns[_campaignId].campaignOwner == msg.sender,
            "You are not the owner of this campaign"
        );
        require(
            campaigns[_campaignId].status == true,
            "Campaign is already inactive"
        );
        campaigns[_campaignId].status = false;
    }

    function editCampaign(
        uint _campaignId,
        string memory _campaignTitle,
        string memory _campaignDescription,
        string memory _campaignImageCID,
        uint _targetAmount,
        uint _duration
    ) public {
        require(
            campaigns[_campaignId].campaignOwner == msg.sender,
            "You are not the owner of this campaign"
        );
        require(
            campaigns[_campaignId].status == true,
            "Campaign is already inactive"
        );
        campaigns[_campaignId].campaignTitle = _campaignTitle;
        campaigns[_campaignId].campaignDescription = _campaignDescription;
        campaigns[_campaignId].campaignImageCID = _campaignImageCID;
        campaigns[_campaignId].targetAmount = _targetAmount;
        campaigns[_campaignId].endAt = block.timestamp + _duration;
    }
}
