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
        "CID2",
        ethers.utils.parseEther("2.0"),
        11
      );

      const campaigns = await crowdFunding.getCampaigns();
      expect(campaigns.length).to.equal(2);
      expect(campaigns[0].campaignTitle).to.equal("Campaign 1");
      expect(campaigns[1].campaignTitle).to.equal("Campaign 2");
      expect(campaigns[0].campaignDescription).to.equal("Desc");
      expect(campaigns[1].campaignDescription).to.equal("Desc");
      expect(campaigns[0].campaignImageCID).to.equal("CID");
      expect(campaigns[1].campaignImageCID).to.equal("CID2");
      expect(campaigns[0].targetAmount).to.equal(
        ethers.utils.parseEther("1.0")
      );
      expect(campaigns[1].targetAmount).to.equal(
        ethers.utils.parseEther("2.0")
      );
      expect(campaigns[0].raisedAmount).to.equal(0);
      expect(campaigns[1].raisedAmount).to.equal(0);
      expect(campaigns[0].status).to.equal(true);
      expect(campaigns[1].status).to.equal(true);
      expect(campaigns[0].campaignOwner).to.equal(owner.address);
      expect(campaigns[1].campaignOwner).to.equal(owner.address);
      const endDate1 = await campaigns[0].endAt.toNumber();
      const predictedEndDate1 = (await Math.floor(Date.now() / 1000)) + 10;
      const fluctuation1 = endDate1 - predictedEndDate1;
      await expect(fluctuation1).to.be.lessThan(500);
      await expect(fluctuation1).to.be.greaterThan(-500);
      const endDate2 = await campaigns[1].endAt.toNumber();
      const predictedEndDate2 = (await Math.floor(Date.now() / 1000)) + 11;
      const fluctuation2 = endDate2 - predictedEndDate2;
      await expect(fluctuation2).to.be.lessThan(500);
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
        "CIDsdf",
        ethers.utils.parseEther("2.0"),
        10
      );

      const activeCampaigns = await crowdFunding.getActiveCampaigns();
      expect(activeCampaigns.length).to.equal(2);
      expect(activeCampaigns[0].campaignTitle).to.equal("Campaign 1");
      expect(activeCampaigns[1].campaignTitle).to.equal("Campaign 2");
      expect(activeCampaigns[0].campaignDescription).to.equal("Desc");
      expect(activeCampaigns[1].campaignDescription).to.equal("Desc");
      expect(activeCampaigns[0].campaignImageCID).to.equal("CID");
      expect(activeCampaigns[1].campaignImageCID).to.equal("CIDsdf");
      expect(activeCampaigns[0].targetAmount).to.equal(
        ethers.utils.parseEther("1.0")
      );
      expect(activeCampaigns[1].targetAmount).to.equal(
        ethers.utils.parseEther("2.0")
      );
      expect(activeCampaigns[0].raisedAmount).to.equal(0);
      expect(activeCampaigns[1].raisedAmount).to.equal(0);
      expect(activeCampaigns[0].status).to.equal(true);
      expect(activeCampaigns[1].status).to.equal(true);
      expect(activeCampaigns[0].campaignOwner).to.equal(owner.address);
      expect(activeCampaigns[1].campaignOwner).to.equal(owner.address);
      const endDate1 = await activeCampaigns[0].endAt.toNumber();
      const predictedEndDate1 = (await Math.floor(Date.now() / 1000)) + 10;
      const fluctuation1 = endDate1 - predictedEndDate1;
      await expect(fluctuation1).to.be.lessThan(500);
      await expect(fluctuation1).to.be.greaterThan(-500);
      const endDate2 = await activeCampaigns[1].endAt.toNumber();
      const predictedEndDate2 = (await Math.floor(Date.now() / 1000)) + 10;
      const fluctuation2 = endDate2 - predictedEndDate2;
      await expect(fluctuation2).to.be.lessThan(500);
      await expect(fluctuation2).to.be.greaterThan(-500);
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
        "CIDasdf",
        ethers.utils.parseEther("2.0"),
        30
      );

      const campaign = await crowdFunding.getParticularCampaign(1);
      expect(campaign.campaignTitle).to.equal("Campaign 2");
      expect(campaign.campaignDescription).to.equal("Desc");
      expect(campaign.campaignImageCID).to.equal("CIDasdf");
      expect(campaign.targetAmount).to.equal(ethers.utils.parseEther("2.0"));
      expect(campaign.raisedAmount).to.equal(0);
      expect(campaign.status).to.equal(true);
      expect(campaign.campaignOwner).to.equal(owner.address);
      const endDate = await campaign.endAt.toNumber();
      const predictedEndDate = (await Math.floor(Date.now() / 1000)) + 30;
      const fluctuation = endDate - predictedEndDate;
      await expect(fluctuation).to.be.lessThan(500);
      await expect(fluctuation).to.be.greaterThan(-500);
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
      const otherCampaign = await crowdFunding.getParticularCampaign(0);
      expect(otherCampaign.status).to.equal(true);
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
        "Desc2",
        "CID2",
        ethers.utils.parseEther("2.0"),
        21
      );

      await crowdFunding.deleteCampaign(1);
      const inactiveCampaigns = await crowdFunding.getInactiveCampaigns();
      expect(inactiveCampaigns.length).to.equal(1);
      expect(inactiveCampaigns[0].campaignTitle).to.equal("Campaign 2");
      expect(inactiveCampaigns[0].campaignDescription).to.equal("Desc2");
      expect(inactiveCampaigns[0].campaignImageCID).to.equal("CID2");
      expect(inactiveCampaigns[0].targetAmount).to.equal(
        ethers.utils.parseEther("2.0")
      );
      expect(inactiveCampaigns[0].raisedAmount).to.equal(0);
      expect(inactiveCampaigns[0].status).to.equal(false);
      expect(inactiveCampaigns[0].campaignOwner).to.equal(owner.address);
      const endDate = await inactiveCampaigns[0].endAt.toNumber();
      const predictedEndDate = (await Math.floor(Date.now() / 1000)) + 21;
      const fluctuation = endDate - predictedEndDate;
      await expect(fluctuation).to.be.lessThan(500);
      await expect(fluctuation).to.be.greaterThan(-500);
    });

    it("Should edit a campaign", async function () {
      await crowdFunding.createCampaign(
        "Campaign 1",
        "Desc",
        "CID",
        ethers.utils.parseEther("1.0"),
        10
      );
      await crowdFunding.editCampaign(
        0,
        "Campaign 2",
        "Descasdfad",
        "CIDasdfasd"
      );
      const campaign = await crowdFunding.getParticularCampaign(0);
      expect(campaign.campaignTitle).to.equal("Campaign 2");
      expect(campaign.campaignDescription).to.equal("Descasdfad");
      expect(campaign.campaignImageCID).to.equal("CIDasdfasd");
      expect(campaign.targetAmount).to.equal(ethers.utils.parseEther("1.0"));
    });
    it("Should not edit a campaign if not owner", async function () {
      await crowdFunding.createCampaign(
        "Campaign 1",
        "Desc",
        "CID",
        ethers.utils.parseEther("1.0"),
        10
      );
      await expect(
        crowdFunding.connect(addr1).editCampaign(0, "Campaign 2", "Desc", "CID")
      ).to.be.revertedWith("You are not the owner of this campaign");
    });
  });
  describe("Contributions", function () {
    it("Should contribute to a campaign", async function () {
      await crowdFunding.createCampaign(
        "Campaign 1",
        "Desc",
        "CID",
        ethers.utils.parseEther("1.0"),
        10
      );
      await crowdFunding
        .connect(addr1)
        .contribute(0, { value: ethers.utils.parseEther("0.1") });
      const campaign = await crowdFunding.getParticularCampaign(0);
      expect(campaign.raisedAmount).to.equal(ethers.utils.parseEther("0.1"));
      await crowdFunding
        .connect(addr2)
        .contribute(0, { value: ethers.utils.parseEther("1.0") });
      const campaign2 = await crowdFunding.getParticularCampaign(0);
      expect(campaign2.raisedAmount).to.equal(ethers.utils.parseEther("1.1"));
    });
    it("Should not contribute to a campaign if inactive", async function () {
      await crowdFunding.createCampaign(
        "Campaign 1",
        "Desc",
        "CID",
        ethers.utils.parseEther("1.0"),
        10
      );
      await crowdFunding.deleteCampaign(0);
      await expect(
        crowdFunding
          .connect(addr1)
          .contribute(0, { value: ethers.utils.parseEther("0.1") })
      ).to.be.revertedWith("Campaign is Inactive");
    });
    it("Should not contribute to a campaign if target is reached", async function () {
      await crowdFunding.createCampaign(
        "Campaign 1",
        "Desc",
        "CID",
        ethers.utils.parseEther("1.0"),
        10
      );

      await crowdFunding
        .connect(addr1)
        .contribute(0, { value: ethers.utils.parseEther("1.2") });
      await expect(
        crowdFunding
          .connect(addr2)
          .contribute(0, { value: ethers.utils.parseEther("1.0") })
      ).to.be.revertedWith("Target amount reached");
    });
    it("Shuold get all contributions", async function () {
      await crowdFunding.createCampaign(
        "Campaign 1",
        "Desc",
        "CID",
        ethers.utils.parseEther("2.0"),
        10
      );
      await crowdFunding
        .connect(addr1)
        .createCampaign(
          "Campaign 2",
          "Desc",
          "CID",
          ethers.utils.parseEther("2.0"),
          10
        );
      await crowdFunding
        .connect(addr1)
        .createCampaign(
          "Campaign 3",
          "Desc",
          "CID",
          ethers.utils.parseEther("2.0"),
          10
        );
      await crowdFunding
        .connect(addr1)
        .contribute(0, { value: ethers.utils.parseEther("1.0") });

      await crowdFunding
        .connect(addr2)
        .contribute(0, { value: ethers.utils.parseEther("1.0") });
      await crowdFunding
        .connect(addr2)
        .contribute(1, { value: ethers.utils.parseEther("1.0") });
      const contributions = await crowdFunding.getAllContributions();
      expect(contributions.length).to.equal(3);
      expect(contributions[0].contributor).to.equal(addr1.address);
      expect(contributions[1].contributor).to.equal(addr2.address);
      expect(contributions[2].contributor).to.equal(addr2.address);
      expect(contributions[0].campaignId).to.equal(0);
      expect(contributions[1].campaignId).to.equal(0);
      expect(contributions[2].campaignId).to.equal(1);
      expect(contributions[0].amount).to.equal(ethers.utils.parseEther("1.0"));
      expect(contributions[1].amount).to.equal(ethers.utils.parseEther("1.0"));
      expect(contributions[2].amount).to.equal(ethers.utils.parseEther("1.0"));
    });
    it("Should get all contributions of a campaign", async function () {
      await crowdFunding.createCampaign(
        "Campaign 1",
        "Desc",
        "CID",
        ethers.utils.parseEther("2.0"),
        10
      );
      await crowdFunding
        .connect(addr1)
        .createCampaign(
          "Campaign 2",
          "Desc",
          "CID",
          ethers.utils.parseEther("2.0"),
          10
        );
      await crowdFunding
        .connect(addr1)
        .createCampaign(
          "Campaign 3",
          "Desc",
          "CID",
          ethers.utils.parseEther("2.0"),
          10
        );
      await crowdFunding
        .connect(addr1)
        .contribute(0, { value: ethers.utils.parseEther("1.0") });

      await crowdFunding
        .connect(addr2)
        .contribute(0, { value: ethers.utils.parseEther("1.0") });
      await crowdFunding
        .connect(addr2)
        .contribute(1, { value: ethers.utils.parseEther("1.0") });
      const contributions =
        await crowdFunding.getAllContributionsForParticularCampaign(0);
      expect(contributions.length).to.equal(2);
      expect(contributions[0].contributor).to.equal(addr1.address);
      expect(contributions[1].contributor).to.equal(addr2.address);
      const contributions2 =
        await crowdFunding.getAllContributionsForParticularCampaign(1);
      expect(contributions2.length).to.equal(1);
      expect(contributions2[0].contributor).to.equal(addr2.address);
    });
    it("Should get total contributions count", async function () {
      await crowdFunding.createCampaign(
        "Campaign 1",
        "Desc",
        "CID",
        ethers.utils.parseEther("2.0"),
        10
      );
      await crowdFunding
        .connect(addr1)
        .contribute(0, { value: ethers.utils.parseEther("1.0") });
      await crowdFunding
        .connect(addr2)
        .contribute(0, { value: ethers.utils.parseEther("1.0") });
      const totalContributions = await crowdFunding.totalContributions();
      expect(totalContributions).to.equal(2);
    });
    it("Should be able to claim the contribution", async function () {
      await crowdFunding.createCampaign(
        "Campaign 1",
        "Desc",
        "CID",
        ethers.utils.parseEther("2.0"),
        10
      );

      await crowdFunding
        .connect(addr1)
        .contribute(0, { value: ethers.utils.parseEther("1.0") });
      await crowdFunding
        .connect(addr2)
        .contribute(0, { value: ethers.utils.parseEther("1.0") });

      await crowdFunding.claimContribution(0);
      const campaign = await crowdFunding.getParticularCampaign(0);

      expect(campaign.raisedAmount).to.equal(ethers.utils.parseEther("2.0"));
      expect(campaign.status).to.equal(false);
    });
    it("Should not be able to claim the contribution if not owner", async function () {
      await crowdFunding.createCampaign(
        "Campaign 1",
        "Desc",
        "CID",
        ethers.utils.parseEther("2.0"),
        10
      );

      await crowdFunding
        .connect(addr1)
        .contribute(0, { value: ethers.utils.parseEther("1.0") });
      await crowdFunding
        .connect(addr2)
        .contribute(0, { value: ethers.utils.parseEther("1.0") });

      await expect(
        crowdFunding.connect(addr2).claimContribution(0)
      ).to.be.revertedWith("You are not the owner of this campaign");
    });
    it("Should not be able to claim the contribution if not active", async function () {
      await crowdFunding.createCampaign(
        "Campaign 1",
        "Desc",
        "CID",
        ethers.utils.parseEther("2.0"),
        10
      );
      await crowdFunding.deleteCampaign(0);
      const campaign = await crowdFunding.getParticularCampaign(0);
      await expect(crowdFunding.claimContribution(0)).to.be.revertedWith(
        "Campaign is Inactive"
      );
    });
    it("Should not be able to claim the contribution if target is not reached", async function () {
      await crowdFunding.createCampaign(
        "Campaign 1",
        "Desc",
        "CID",
        ethers.utils.parseEther("3.0"),
        10
      );
      await crowdFunding.connect(addr1).contribute(0, {
        value: ethers.utils.parseEther("1.0"),
      });
      await expect(crowdFunding.claimContribution(0)).to.be.revertedWith(
        "Target amount not reached"
      );
    });
    it("Should check if ONLY the raised amount of the particular campaign is claimed, rest all balance is STILL secured in the contract ", async function () {
      await crowdFunding.createCampaign(
        "Campaign 1",
        "Desc",
        "CID",
        ethers.utils.parseEther("2.0"),
        10
      );

      await crowdFunding
        .connect(addr1)
        .createCampaign(
          "Campaign 2",
          "Desc",
          "CID",
          ethers.utils.parseEther("2.0"),
          10
        );

      await crowdFunding
        .connect(addr1)
        .contribute(0, { value: ethers.utils.parseEther("1.0") });
      await crowdFunding
        .connect(addr2)
        .contribute(0, { value: ethers.utils.parseEther("1.0") });

      await crowdFunding.connect(addr2).contribute(1, {
        value: ethers.utils.parseEther("3.0"),
      });

      await crowdFunding.claimContribution(0);

      const contractBalance = await ethers.provider.getBalance(
        crowdFunding.address
      );
      expect(contractBalance).to.equal(ethers.utils.parseEther("3.0"));
    });
  });
});
