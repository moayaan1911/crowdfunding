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
    it("Should Create a new campaign", async () => {
      const title = "Test Campaign";
      const description = "Campaign description";
      const imageCid = "image.jpg";
      const target = ethers.utils.parseEther("1000");
      const duration = 7 * 24 * 60 * 60; // 7 days in seconds
      // Calculate end date

      await crowdFunding.createCampaign(
        title,
        description,
        imageCid,
        target,
        duration
      );

      const campaign = await crowdFunding.getParticularCampaign(0);
      const endDate = await campaign.endAt.toNumber();
      const predictedEndDate = (await Math.floor(Date.now() / 1000)) + duration;
      await expect(campaign.campaignTitle).to.equal(title);
      await expect(campaign.campaignDescription).to.equal(description);
      await expect(campaign.campaignImageCID).to.equal(imageCid);
      await expect(campaign.targetAmount).to.equal(target);
      await expect(campaign.raisedAmount).to.equal(0);
      const fluctuation = endDate - predictedEndDate;
      await expect(fluctuation).to.be.lessThan(500);
      await expect(fluctuation).to.be.greaterThan(-500);
      await expect(campaign.status).to.equal(true);
      await expect(campaign.campaignOwner).to.equal(owner.address);
    });

    it("Should not allow to create a campaign with zero target", async () => {
      const title = "Test Campaign";
      const description = "Campaign description";
      const imageCid = "image.jpg";
      const target = ethers.utils.parseEther("0");
      const duration = 6;

      await expect(
        crowdFunding.createCampaign(
          title,
          description,
          imageCid,
          target,
          duration
        )
      ).to.be.revertedWith("Target amount should be greater than 0");
    });

    it(" Should not allow to create a campaign with zero duration", async () => {
      const title = "Test Campaign";
      const description = "Campaign description";
      const imageCid = "aaadfasd";
      const target = ethers.utils.parseEther("1.0");
      const duration = 0;

      await expect(
        crowdFunding.createCampaign(
          title,
          description,
          imageCid,
          target,
          duration
        )
      ).to.be.revertedWith("Duration should be greater than 0");
    });

    it("Should return the total number of campaigns ", async function () {
      const title = "Test Campaign";
      const description = "Campaign description";
      const imageCid = "image.jpg";
      const target = ethers.utils.parseEther("2.0");
      const duration = 7 * 24 * 60 * 60; // 7 days in seconds
      await crowdFunding.createCampaign(
        title,
        description,
        imageCid,
        target,
        duration
      );

      const title2 = "Test Campaign 2";
      const description2 = "Campaign description 2";
      const imageCid2 = "image2.jpg";
      const target2 = ethers.utils.parseEther("1.0");
      const duration2 = 7 * 24 * 60 * 60; // 7 days in seconds
      await crowdFunding.createCampaign(
        title2,
        description2,
        imageCid2,
        target2,
        duration2
      );

      const totalCampaigns = await crowdFunding.totalCampaigns();
      expect(totalCampaigns).to.equal(2);
    });
    it("Should return all campaigns", async function () {
      await crowdFunding.createCampaign(
        "Campaign 1",
        "Desc",
        "CID",
        ethers.utils.parseEther("1.0"),
        10
      );

      await crowdFunding.createCampaign(
        "Campaign 2",
        "Desc",
        "CID",
        ethers.utils.parseEther("2.0"),
        10
      );

      const campaigns = await crowdFunding.getCampaigns();
      expect(campaigns.length).to.equal(2);
    });

    it("Should return active campaigns", async function () {
      await crowdFunding.createCampaign(
        "Campaign 1",
        "Desc",
        "CID",
        ethers.utils.parseEther("1.0"),
        10
      );

      await crowdFunding.createCampaign(
        "Campaign 2",
        "Desc",
        "CID",
        ethers.utils.parseEther("2.0"),
        10
      );

      const activeCampaigns = await crowdFunding.getActiveCampaigns();
      expect(activeCampaigns.length).to.equal(2);
    });
    it("Should return a particular campaign", async function () {
      await crowdFunding.createCampaign(
        "Campaign 1",
        "Desc",
        "CID",
        ethers.utils.parseEther("1.0"),
        10
      );

      await crowdFunding.createCampaign(
        "Campaign 2",
        "Desc",
        "CID",
        ethers.utils.parseEther("2.0"),
        10
      );

      const campaign = await crowdFunding.getParticularCampaign(1);
      expect(campaign.campaignTitle).to.equal("Campaign 2");
    });

    it("Should delete a campaign", async function () {
      await crowdFunding.createCampaign(
        "Campaign 1",
        "Desc",
        "CID",
        ethers.utils.parseEther("1.0"),
        10
      );

      await crowdFunding.createCampaign(
        "Campaign 2",
        "Desc",
        "CID",
        ethers.utils.parseEther("2.0"),
        10
      );

      await crowdFunding.deleteCampaign(1);
      const campaign = await crowdFunding.getParticularCampaign(1);
      expect(campaign.status).to.equal(false);
    });

    it("Should not delete a campaign if not owner", async function () {
      await crowdFunding.createCampaign(
        "Campaign 1",
        "Desc",
        "CID",
        ethers.utils.parseEther("1.0"),
        10
      );

      await crowdFunding.createCampaign(
        "Campaign 2",
        "Desc",
        "CID",
        ethers.utils.parseEther("2.0"),
        10
      );

      await expect(
        crowdFunding.connect(addr1).deleteCampaign(1)
      ).to.be.revertedWith("You are not the owner of this campaign");
    });

    it("Should not delete a campaign if not active", async function () {
      await crowdFunding.createCampaign(
        "Campaign 1",
        "Desc",
        "CID",
        ethers.utils.parseEther("1.0"),
        10
      );

      await crowdFunding.createCampaign(
        "Campaign 2",
        "Desc",
        "CID",
        ethers.utils.parseEther("2.0"),
        10
      );

      await crowdFunding.deleteCampaign(1);
      await expect(crowdFunding.deleteCampaign(1)).to.be.revertedWith(
        "Campaign is already inactive"
      );
    });

    it("Should return inactive campaigns", async function () {
      await crowdFunding.createCampaign(
        "Campaign 1",
        "Desc",
        "CID",
        ethers.utils.parseEther("1.0"),
        10
      );

      await crowdFunding.createCampaign(
        "Campaign 2",
        "Desc",
        "CID",
        ethers.utils.parseEther("2.0"),
        10
      );

      await crowdFunding.deleteCampaign(1);
      const inactiveCampaigns = await crowdFunding.getInactiveCampaigns();
      expect(inactiveCampaigns.length).to.equal(1);
    });
  });
});
