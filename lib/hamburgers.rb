# Derived from https://github.com/thoughtbot/bourbon/blob/v4-stable/lib/bourbon.rb
# Special thanks to the thoughtbot team b/c I had no clue what I was doing
dir = File.dirname(__FILE__)
$LOAD_PATH.unshift dir unless $LOAD_PATH.include?(dir)

unless defined?(Sass)
  require 'sass'
end

module Hamburgers
  if defined?(Rails) && defined?(Rails::Engine)
    class Engine < ::Rails::Engine

    end
  end

  hamburgers_path = File.expand_path("../../_sass/hamburgers", __FILE__)
  ENV["SASS_PATH"] = [ENV["SASS_PATH"], hamburgers_path].compact.join(File::PATH_SEPARATOR)
end
