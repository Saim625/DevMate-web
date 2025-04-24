import { CheckIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import React, { useEffect, useState } from "react";

const Subscriptions = () => {
  const [isPremium, setIsPremium] = useState(false);

  const handlePremium = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });
    if (res.data.message === "User is premium") {
      setIsPremium(true);
    } else {
      setIsPremium(false);
    }
  };

  useEffect(() => {
    handlePremium();
  }, []);

  const tiers = [
    {
      name: "Silver",
      id: "tier-silver",
      planKey: "silver",
      priceMonthly: "Rs. 500",
      description:
        "Basic premium plan to boost your visibility and credibility.",
      features: [
        "Blue tick on profile",
        "Profile highlighted in search",
        "10 connection requests/day",
        "Basic analytics on profile views",
      ],
      featured: false,
    },
    {
      name: "Gold",
      id: "tier-gold",
      planKey: "gold",
      priceMonthly: "Rs. 1200",
      description: "Get full access to premium features and priority exposure.",
      features: [
        "All Silver features included",
        "Unlimited connection requests",
        "Priority profile placement",
        "Priority support",
      ],
      featured: true,
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleSubscribe = async (planKey) => {
    try {
      const res = await axios.post(
        BASE_URL + "/create-payment",
        { plan: planKey },
        { withCredentials: true }
      );

      if (res.data.redirectUrl) {
        window.location.href = res.data.redirectUrl;
      } else {
        alert("Error: Couldn't get payment URL.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return isPremium ? (
    <div className="bg-base-300 px-6 py-20 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-primary font-bold text-lg uppercase tracking-wide">
          Subscriptions
        </h2>
        <p className="mt-2 text-4xl font-bold text-white sm:text-5xl">
          You are already a premium member
        </p>
        <p className="mt-4 text-base text-white/70 max-w-xl mx-auto">
          Thank you for being a premium member. You can enjoy all the features
          without any interruptions.
        </p>
      </div>
    </div>
  ) : (
    <div className="bg-base-300 px-6 py-20 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-primary font-bold text-lg uppercase tracking-wide">
          Subscriptions
        </h2>
        <p className="mt-2 text-4xl font-bold text-white sm:text-5xl">
          Choose the right plan for you
        </p>
        <p className="mt-4 text-base text-white/70 max-w-xl mx-auto">
          Upgrade your developer profile to unlock premium features and connect
          better with the community.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={classNames(
              "rounded-2xl p-6 sm:p-8 shadow-lg ring-1 ring-white/10 transition hover:scale-[1.01]",
              tier.featured ? "bg-base-100" : "bg-base-100/70"
            )}
          >
            <h3
              id={tier.id}
              className="text-lg font-semibold text-primary mb-2"
            >
              {tier.name}
            </h3>
            <p className="text-3xl font-bold text-white">
              {tier.priceMonthly}{" "}
              <span className="text-sm font-medium text-white/60">/month</span>
            </p>
            <p className="mt-3 text-sm text-white/70">{tier.description}</p>
            <ul className="mt-6 space-y-3 text-sm text-white">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <CheckIcon className="h-5 w-5 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(tier.planKey)}
              className={classNames(
                tier.featured ? "btn btn-primary" : "btn btn-secondary",
                "mt-6 w-full"
              )}
            >
              {tier.featured ? "Upgrade to Gold" : "Choose Silver"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
