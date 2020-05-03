require 'rails_helper'
require 'rspec_api_documentation/dsl'
require 'faker'

resource "Contacts" do
  before do
    header "Accept", 'application/vnd.bidzwheelz; version=1'
    @name = Faker::Name.name
    @contact_number = Faker::Base.numerify('##########')
    @email = Faker::Internet.email
    @city = Faker::Address.city
    @message = Faker::String.random(length: 32)
  end

  post "/contacts" do
    parameter :name, "Name", :required => true
    parameter :email, "Email", :required => true
    parameter :contact_number, "Contact Number", :required => true
    parameter :city, "City", :required => true
    parameter :message, "Message", :required => true
    let(:name) { @name }
    let(:email) { @email }
    let(:contact_number) { @contact_number }
    let(:city) { @city }
    let(:message) { @message }
    example "create a message request" do
      do_request
      expect(status).to eq 200
    end
  end

  post "/contacts" do
    parameter :name, "Name", :required => true
    parameter :email, "Email", :required => true
    parameter :contact_number, "Contact Number", :required => true
    parameter :city, "City", :required => true
    parameter :message, "Message", :required => true
    let(:name) { Faker::Name.name }
    let(:email) { "abc@gmail" }
    let(:contact_number) { Faker::Base.numerify('##########') }
    let(:city) { Faker::Address.city }
    let(:message) { Faker::String.random(length: 32) }
    example "failure to create a message request" do
      do_request
      expect(status).to eq 422
    end
  end




end
