const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("CrowdFunding", function () {
  let crowdFunding, owner, addr1, addr2;

  beforeEach(async function () {
    // Get contract and deploy
    const CrowdFunding = await ethers.getContractFactory("CrowdFunding");
    crowdFunding = await CrowdFunding.deploy();

    // Get signers
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  describe("Campaigns", function () {
    it("Should create a new campaign", async function () {
      const tx = await crowdFunding
        .connect(owner)
        .createCampaign("Test Campaign", "Description", "ImageCID", 100, 10);
      await tx.wait();

      const campaigns = await crowdFunding.getAllCampaigns();
      expect(campaigns.length).to.equal(1);
      expect(campaigns[0].campaignTitle).to.equal("Test Campaign");
    });

    it("Should get campaign by id", async function () {
      await crowdFunding
        .connect(owner)
        .createCampaign("Test 2", "Desc", "CID", 200, 10);

      const campaign = await crowdFunding.getCampaignById(0);
      expect(campaign.campaignTitle).to.equal("Test 2");
    });

    it("Should return the owner of a campaign", async function () {
      await crowdFunding
        .connect(owner)
        .createCampaign("Test 3", "Desc", "CID", 200, 10);
      expect(await crowdFunding.connect(owner).getOwnerOfACampaign(0)).to.equal(
        owner.address
      );
    });

    it("Should get all campaigns", async function () {
      await crowdFunding
        .connect(owner)
        .createCampaign("Test 4", "Desc", "CID", 200, 10);
      await crowdFunding
        .connect(owner)
        .createCampaign("Test 5", "Desc", "CID", 200, 10);
      await crowdFunding
        .connect(owner)
        .createCampaign("Test 6", "Desc", "CID", 200, 10);

      const campaigns = await crowdFunding.getAllCampaigns();
      expect(campaigns.length).to.equal(3);
    });

    it("Should delete a campaign by turning status to false", async function () {
      await crowdFunding
        .connect(owner)
        .createCampaign("Test 7", "Desc", "CID", 200, 10);
      await crowdFunding.connect(owner).deleteCampaign(0);

      const campaigns = await crowdFunding.getAllCampaigns();
      expect(campaigns[0].status).to.equal(false);
    });
  });

  describe("Contributions", function () {
    it("Should contribute to a campaign", async function () {
      await crowdFunding
        .connect(owner)
        .createCampaign("Campaign 1", "Desc", "CID", 100, 10);

      await crowdFunding
        .connect(addr1)
        .contributeToCampaign(0, { value: ethers.utils.parseEther("1.0") });

      const contributions =
        await crowdFunding.getAllContributionsForAParticularCampaign(0);

      expect(contributions.length).to.equal(1);
      expect(contributions[0].amount).to.equal(ethers.utils.parseEther("1.0"));
    });
    it("Should get all contributions for a campaign", async function () {
      await crowdFunding
        .connect(owner)
        .createCampaign("Campaign 1", "Desc", "CID", 100, 10);

      await crowdFunding
        .connect(addr1)
        .contributeToCampaign(0, { value: ethers.utils.parseEther("1") });
      await crowdFunding
        .connect(addr2)
        .contributeToCampaign(0, { value: ethers.utils.parseEther("2") });

      const contributions =
        await crowdFunding.getAllContributionsForAParticularCampaign(0);

      expect(contributions.length).to.equal(2);
      expect(contributions[0].amount).to.equal(ethers.utils.parseEther("1"));
      expect(contributions[1].amount).to.equal(ethers.utils.parseEther("2"));
    });
  });

  describe("Claiming", function () {
    it("Should allow owner to claim funds if target reached", async function () {
      await crowdFunding
        .connect(owner)
        .createCampaign("Campaign 1", "Desc", "CID", 100, 10);

      await crowdFunding
        .connect(addr1)
        .contributeToCampaign(0, { value: ethers.utils.parseEther("1.0") });
      await crowdFunding
        .connect(addr2)
        .contributeToCampaign(0, { value: ethers.utils.parseEther("1.0") });

      const ownerBalanceBefore = await owner.getBalance();

      await crowdFunding.connect(owner).claimFunds(0);

      const ownerBalanceAfter = await owner.getBalance();

      expect(ownerBalanceAfter).to.be.gt(ownerBalanceBefore);
    });
    it("Should not allow owner to claim funds if target not reached", async function () {
      await crowdFunding
        .connect(owner)
        .createCampaign("Campaign 1", "Desc", "CID", 100, 10);

      await expect(
        crowdFunding.connect(owner).claimFunds(0)
      ).to.be.revertedWith("Campaign target amount not reached");
    });

    it("Should not allow owner to claim funds if already claimed", async function () {
      await crowdFunding
        .connect(owner)
        .createCampaign("Campaign 1", "Desc", "CID", 100, 10);
      await crowdFunding
        .connect(addr1)
        .contributeToCampaign(0, { value: ethers.utils.parseEther("1.0") });
      expect(
        await crowdFunding.connect(owner).claimFunds(0)
      ).to.be.revertedWith("Campaign is not active");
    });

    it("Should not allow owner to claim funds if not owner", async function () {
      await crowdFunding
        .connect(owner)
        .createCampaign("Campaign 1", "Desc", "CID", 100, 10);
      await crowdFunding
        .connect(addr1)
        .contributeToCampaign(0, { value: ethers.utils.parseEther("1.0") });
      await crowdFunding
        .connect(addr2)
        .contributeToCampaign(0, { value: ethers.utils.parseEther("1.0") });
      expect(crowdFunding.connect(addr1).claimFunds(0)).to.be.revertedWith(
        "Only campaign owner can claim funds"
      );
    });
    it("Should not allow owner to claim funds if campaign end date not reached", async function () {
      await crowdFunding
        .connect(owner)
        .createCampaign("Campaign 1", "Desc", "CID", 100, 10);
      await crowdFunding
        .connect(addr1)
        .contributeToCampaign(0, { value: ethers.utils.parseEther("1.0") });
      await crowdFunding
        .connect(addr2)
        .contributeToCampaign(0, { value: ethers.utils.parseEther("1.0") });
      expect(crowdFunding.connect(owner).claimFunds(0)).to.be.revertedWith(
        "Campaign end date not reached"
      );
    });
  });
});
