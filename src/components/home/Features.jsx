import React from "react";
import { features, additionalFeatures, processSteps } from "../../data/features_en";
import { ArrowRight, Check } from "lucide-react";

const colorClasses = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    icon: "bg-blue-500",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
    hover: "hover:border-blue-400 dark:hover:border-blue-600",
    gradient: "from-blue-500 to-blue-600"
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    icon: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800",
    hover: "hover:border-emerald-400 dark:hover:border-emerald-600",
    gradient: "from-emerald-500 to-emerald-600"
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-900/20",
    icon: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800",
    hover: "hover:border-amber-400 dark:hover:border-amber-600",
    gradient: "from-amber-500 to-amber-600"
  }
};

const Features = () => {
  return (
    <section id="features" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
<span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Everything you need
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Complete suite of tools to simplify your maritime surveys, from creation to professional report generation.
          </p>
        </div>

        {/* Main Features Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color];
            return (
              <div
                key={feature.id}
                className={`relative group bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 ${colors.border} ${colors.hover} transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Number badge */}
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-sm font-bold">
                  {feature.id}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 ${colors.icon} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">
                  {feature.subtitle}
                </p>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-3 mb-8">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <div className={`w-5 h-5 rounded-full ${colors.icon} flex items-center justify-center flex-shrink-0`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Stats */}
                <div className={`pt-6 border-t ${colors.border} flex items-baseline gap-2`}>
                  <span className={`text-3xl font-bold ${colors.text}`}>{feature.stats.value}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{feature.stats.label}</span>
                </div>

                {/* Learn more link */}
                <div className={`mt-6 flex items-center gap-2 ${colors.text} font-semibold cursor-pointer group/link`}>
                  <span>En savoir plus</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              How it works?
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Get started in minutes, not days
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={step.step} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-2xl font-bold mb-4 shadow-lg">
                  {step.step}
                </div>
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Features Grid */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              And much more...
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

