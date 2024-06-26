import fs from 'fs';
import plistParser, {PlistValue} from 'plist';
import {XcodeProject} from 'xcode';
import getPlistPath from './getPlistPath';

/**
 * Writes to Info.plist located in the iOS project
 *
 * Returns `null` if INFOPLIST_FILE is not specified or file is non-existent.
 */
function writePlist(
  project: XcodeProject,
  sourceDir: string,
  plist: PlistValue,
) {
  const plistPath = getPlistPath(project, sourceDir);

  if (!plistPath) {
    return null;
  }

  // We start with an offset of -1, because Xcode maintains a custom
  // indentation of the plist.
  // Ref: https://github.com/facebook/react-native/issues/11668
  return fs.writeFileSync(
    plistPath,
    `${plistParser.build(plist, {indent: '\t', offset: -1})}\n`,
  );
}

export default writePlist;
