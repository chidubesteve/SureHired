import { Heart, Search, Shield, Users } from 'lucide-react';
import React from 'react'


const Features = () => {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold md:text-4xl">
            Why Choose SureHired?
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            We connect the best talent with the best opportunities through our
            platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-brand-600" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Smart Job Search
            </h3>
            <p className="text-neutral-600">
              Advanced algorithms match you with the perfect opportunities based
              on your skills and preferences.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-brand-600" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Top Companies
            </h3>
            <p className="text-neutral-600">
              Connect with industry leaders and innovative startups that are
              actively hiring talent.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-brand-600" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Secure & Private
            </h3>
            <p className="text-neutral-600">
              Your personal information is protected with enterprise-grade
              security and privacy controls.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-brand-600" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Easy to Use
            </h3>
            <p className="text-neutral-600">
              Our user-friendly interface makes finding your dream job a breeze.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;