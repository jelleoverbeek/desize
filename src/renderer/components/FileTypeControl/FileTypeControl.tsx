import React, { useState } from 'react';
import IOptionControl from 'interfaces/IOptionControl.interface';
import OptionControl from '../OptionsItem/OptionControl';
import { updateExportOptionsByKey } from '../../utilities/exportOptions';

interface IState {
  activeFileType: string;
}

interface IProps extends IOptionControl {
  fileType: string;
}

const FileTypeControl: React.FunctionComponent<IProps> = ({
  fileType,
  exportOptionsChanged,
}): JSX.Element => {
  const [activeFileType, setActiveFileType] = useState<string>(fileType);
  const fileTypes = ['jpg', 'png', 'webp'];

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
