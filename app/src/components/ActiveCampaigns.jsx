import React from "react";
import Card from "./CardData";
export default function ActiveCampaigns() {
  const dataSets = [
    {
      id: 1,
      imageUrl: "https://source.unsplash.com/150x300/?animals",
      title: "Fundraiser for Animal Shelter",
      description:
        "Help raise money to build a new shelter for rescued animals",
      createdAt: "August 5, 2022 3:45pm",
    },
    {
      id: 2,
      imageUrl: "https://source.unsplash.com/150x300/?school",
      title: "School Supplies for Children",
      description: "Donate to provide school supplies for kids in need",
      createdAt: "August 1, 2022 12:30pm",
    },
    {
      id: 3,
      imageUrl: "https://source.unsplash.com/150x300/?home",
      title: "Build Homes for Families",
      description: "Help build affordable housing for low-income families",
      createdAt: "July 30, 2022 9:15am",
    },
    {
      id: 4,
      imageUrl: "https://source.unsplash.com/150x300/?nature",
      title: "Protect the Environment",
      description: "Support initiatives to protect and preserve nature",
      createdAt: "June 25, 2022 6:00pm",
    },
    {
      id: 5,
      imageUrl: "https://source.unsplash.com/150x300/?food",
      title: "Feed the Hungry",
      description: "Contribute to feeding programs for the less fortunate",
      createdAt: "May 15, 2022 10:45am",
    },
    {
      id: 6,
      imageUrl: "https://source.unsplash.com/150x300/?education",
      title: "Educate Underprivileged Children",
      description:
        "Support education for children from disadvantaged backgrounds",
      createdAt: "April 2, 2022 2:20pm",
    },
    {
      id: 7,
      imageUrl: "https://source.unsplash.com/150x300/?water",
      title: "Clean Water for All",
      description: "Help provide clean and safe water to communities in need",
      createdAt: "March 10, 2022 8:30am",
    },
  ];
  return (
    <div className="mt-20 md:text-left text-center">
      <h1 className="font-bold text-5xl md:mx-16 my-5">Active Campaigns:</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-4">
        {dataSets.map((data) => (
          <Card key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
}
