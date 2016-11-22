$:.push File.expand_path("../lib", __FILE__)
require "hamburgers/version"

Gem::Specification.new do |spec|
  spec.name        = "hamburgers"
  spec.version     = Hamburgers::VERSION
  spec.platform    = Gem::Platform::RUBY
  spec.authors     = ["Jonathan Suh"]
  spec.email       = ["hello@jonsuh.com"]
  spec.homepage    = "https://jonsuh.com/hamburgers"
  spec.summary     = "Tasty CSS-animated Hamburgers"
  spec.description = "Hamburgers is a collection of tasty CSS-animated hamburger icons. Also included is the source as a modular and customizable Sass library, so cook up your own hamburger."
  spec.license     = "MIT"

  spec.files         = `git ls-files`.split("\n")
  spec.require_paths = ["lib"]
end
