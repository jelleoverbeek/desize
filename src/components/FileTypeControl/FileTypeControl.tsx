import React, { useState } from 'react';
import IOptionControl from 'interfaces/IOptionControl.interface';
import OptionControl from '../OptionsItem/OptionControl';
import { updateExportOptionsByKey } from '../../utilities/exportOptions';

interface IState {
  activeFileType: string;
}

interface IProps extends IOptionControl {
  fileTypes: ['jpg', 'png', 'webp'];
  fileType: string;
}

const FileTypeControl: React.FunctionComponent<IProps> = ({
  fileType,
  fileTypes = ['jpg', 'png', 'webp'],
  exportOptionsChanged,
}): JSX.Element => {
  const [activeFileType, setActiveFileType] = useState<string>(fileType);

  function change(event: React.FormEvent<HTMLSelectElement>) {
    setActiveFileType(event.currentTarget.value);
    updateExportOptionsByKey(event.currentTarget.value, 'fileType');
    exportOptionsChanged();
  }

  return (
    <OptionControl>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="file-type-control">File type</label>
      <select
        id="file-type-control"
        onChange={(event) => change(event)}
        value={activeFileType}
      >
        {fileTypes.map((item) => {
          return (
            <option value={item} key={item}>
              {item.toUpperCase()}
            </option>
          );
        })}
      </select>
    </OptionControl>
  );
};

export default FileTypeControl;
