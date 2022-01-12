import React, { useState, useEffect } from 'react';
import IOptionControl from 'interfaces/IOptionControl.interface';
import OptionControl from '../OptionsItem/OptionControl';
import {
  updateExportOptionsByKey,
  getExportOptionsByKey,
} from '../../utilities/exportOptions';

interface IProps extends IOptionControl {
  fileType: string;
}

function getCurrentFileTypeQuality(exportOptionsFileType: string): number {
  const currentFileTypeQuality: number = getExportOptionsByKey(
    exportOptionsFileType,
    'quality'
  );

  return currentFileTypeQuality;
}

const QualityControl: React.FunctionComponent<IProps> = ({
  fileType,
}): JSX.Element => {
  const minValue = 1;
  const maxValue = 100;
  const exportOptionsFileType = `${fileType}Options`;

  const [value, setValue] = useState<number>(
    getCurrentFileTypeQuality(exportOptionsFileType)
  );

  useEffect(() => {
    setValue(getCurrentFileTypeQuality(exportOptionsFileType));
  }, [exportOptionsFileType]);

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    let numberValue = Number(event.currentTarget.value);

    if (event.currentTarget.value !== '') {
      if (numberValue >= maxValue) {
        numberValue = maxValue;
      }

      if (numberValue <= minValue) {
        numberValue = minValue;
      }

      updateExportOptionsByKey(numberValue, exportOptionsFileType, 'quality');
    }

    setValue(numberValue);
  }

  function handleBlur(event: React.FormEvent<HTMLInputElement>) {
    if (event.currentTarget.value === '') {
      updateExportOptionsByKey(maxValue, exportOptionsFileType, 'quality');
      setValue(maxValue);
    }
  }

  return (
    <OptionControl isChild>
      <label htmlFor="quality-control">
        Quality ({minValue}-{maxValue}%)
      </label>
      <input
        type="number"
        id="quality-control"
        min={minValue}
        max={maxValue}
        value={value || ''}
        onChange={(event) => handleChange(event)}
        onBlur={(event) => handleBlur(event)}
        step={1}
      />
    </OptionControl>
  );
};

export default QualityControl;
