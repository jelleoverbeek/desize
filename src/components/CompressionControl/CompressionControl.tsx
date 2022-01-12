import React, { useState } from 'react';
import IOptionControl from 'interfaces/IOptionControl.interface';
import OptionControl from '../OptionsItem/OptionControl';
import {
  updateExportOptionsByKey,
  getExportOptionsByKey,
} from '../../utilities/exportOptions';

interface IProps extends IOptionControl {
  fileType: string;
}

function getCurrentFileTypeCompression(exportOptionsFileType: string): number {
  const currentFileTypeCompression: number = getExportOptionsByKey(
    exportOptionsFileType,
    'compressionLevel'
  );

  return currentFileTypeCompression;
}

const CompressionControl: React.FunctionComponent<IProps> = ({
  fileType,
}): JSX.Element => {
  const minValue = 0;
  const maxValue = 9;
  const exportOptionsFileType = `${fileType}Options`;

  const [value, setValue] = useState<number | string>(
    getCurrentFileTypeCompression(exportOptionsFileType)
  );
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  // const value = React.useRef(
  //   getCurrentFileTypeCompression(exportOptionsFileType)
  // );

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const valueAsNumber = Number(event.currentTarget.value);

    if (valueAsNumber <= maxValue && valueAsNumber >= minValue) {
      updateExportOptionsByKey(
        valueAsNumber,
        exportOptionsFileType,
        'compressionLevel'
      );

      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }

    setValue(event.currentTarget.value);
  }

  return (
    <OptionControl isChild>
      <label htmlFor="compression-control">
        Compression ({minValue}-{maxValue})
      </label>
      <input
        type="number"
        id="compression-control"
        className={isInvalid ? 'invalid' : 'valid'}
        min={minValue}
        max={maxValue}
        value={value || ''}
        onChange={(event) => handleChange(event)}
        pattern="[0-9]{1}"
        step={1}
      />
    </OptionControl>
  );
};

export default CompressionControl;
