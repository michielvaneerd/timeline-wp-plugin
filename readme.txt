=== Mve Timeline ===
Contributors: michielve
Tags: toc, table of contents
Requires at least: 4.6
Tested up to: 6.9
Requires PHP: 5.4.0
Stable tag: trunk
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Display a table of contents

== Description ==

Create timelines and add timeline items. This can be displayed in the accompanying timeline app.

The timelines are taxonomy items and the timeline items are custom post types.

Timeline

* Name - The name of the timeline as it is being displayed in the app.
* Slug - The url part for this timeline.
* Published - If selected, then it will be available in the app. You can keep this disabled and add timeline items to it without it being available in the app.

Timeline item

* Title
* Intro - Short text that is displayed in the app.
* Year start and Year end - A number, for example 200000 or -1200000.
* Year start name and Year end name - The label that is displayed instead of the real numbers, for example 4M when the number is 4000000000.
* Timeline - The timeline this item belongs to.
* Image - The image for the item.
* Source - The source of the image.
* Info - Some extra text with the image.
* Has content - When checked, a link becomes available in the app that opens a webview for the "other" content of this item. So this can be used to add long HTML text and media content to the items.
* Links - A list of one or more links that can be displayed with the item in the app.

App

The first thing to do when opening the app, is to add the host of the Wordpress site that contains the timelines content. Just add the root of the host for your Wordpress site, for example https://www.mysite.com.

= Features =

* Create timelines
* Add timeline items

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/mve-timeline` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.

== Changelog ==

= 20251208 =
* First release
