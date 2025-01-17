/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2022 Yegor Bugayenko
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const {XMLParser} = require('fast-xml-parser');

let version = '';

/**
 * Load the latest version from GitHub releases.
 * @return {String} Latest version, for example '0.23.1'
 */
module.exports = function() {
  const repo = 'org/eolang/eo-maven-plugin';
  if (version === '') {
    const url = 'https://repo.maven.apache.org/maven2/' + repo + '/maven-metadata.xml';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    if (xhr.status != 200) {
      throw new Error('Invalid response status ' + xhr.status + ' from ' + url);
    }
    const xml = new XMLParser().parse(xhr.responseText);
    version = xml.metadata.versioning.release;
    console.debug('The latest version of %s at %s is %s', repo, url, version);
  }
  console.info('EO version is %s', version);
  return version;
};
