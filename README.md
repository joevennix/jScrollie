jScrollie is a lightweight jQuery plugin that allows you to skin your scroll bars. I wrote it because most of the js scroll bar solutions I had seen felt sluggish and non-native. jScrollie works by pushing the original scroll bar behind a div with overflow-x set to hidden, which lets you maintain your original scrolling mechanism. A "fake", HTML-based scroll bar is then generated and placed where the user expects the original scroll bar to appear.

jScrollie is based almost entirely on http://code.google.com/p/scrollbarpaper/

You can see a demo here: http://joevennix.github.com/jScrollie/

== Version Log ==
 *  April 26, 2011: v0.1
 *    - works on latest versions of Safari, Chrome, and FF
 *    - (timeout?) bug causes scroll to eventually become extremely 
 *      sluggish on Chrome
 *  June 29, 2011:  v0.5
 *    - major code refactor, eliminated need for setTimeout call
 *    - works on IE8+, Safari 2+, FF3.0+, Chrome 1.0+
 *    - next release: embedded jScrollie rather than only around <body>
 *    - problems: no longer supports dynamic resizing (must do manually)
 *  
 *  @author Joe Vennix
 *  http://joevennix.com