import React, { useState } from 'react';
import './ResolutionControl.css';
import IOptionControl from 'interfaces/IOptionControl.interface';
import OptionControl from 'components/OptionsItem/OptionControl';
import {
  updateExportOptionsByKey,
  getExportOptions,
} from '../../utilities/exportOptions';

interface IResolution {
  width: number | string;
  height: number | string;
}

function zeroToEmptyString(value: number): number | string {
  if (value === 0) {
    return '';
  }

  return value;
}

const ResolutionControl: React.FunctionComponent<IOptionControl> = ({
  exportOptionsChanged,
}): JSX.Element => {
  const [resolution, setResolution] = useState<IResolution>({
    width: zeroToEmptyString(getExportOptions().resolutionOptions.width),
    height: zeroToEmptyString(getExportOptions().resolutionOptions.height),
  });

  function updateResolutionOptions(
    dimension: 'width' | 'height',
    value: number | string
  ) {
    if (dimension === 'width') {
      setResolution({
        width: value,
        height: resolution.height,
      });
      updateExportOptionsByKey(Number(value), 'resolutionOptions', 'width');
    }

    if (dimension === 'height') {
      setResolution({
        width: resolution.width,
        height: value,
      });
      updateExportOptionsByKey(Number(value), 'resolutionOptions', 'height');
    }

    exportOptionsChanged();
  }

  function renderResetLink(dimension: 'width' | 'height') {
    return (
      <button
        type="button"
        onClick={(): void => {
          if (dimension === 'width') {
            updateResolutionOptions('width', '');
          }
          if (dimension === 'height') {
            updateResolutionOptions('height', '');
          }
        }}
      >
        (reset)
      </button>
    );
  }

  return (
    <>
      <OptionControl>
        <label
          htmlFor="resolution-control-width"
          className="resolution-control-label"
        >
          Width
          {resolution.width ? renderResetLink('width') : null}
        </label>

        <input
          id="resolution-control-width"
          type="number"
          placeholder="auto"
          step={8}
          value={resolution.width || ''}
          onChange={(event): void => {
            updateResolutionOptions('width', event.target.value);
          }}
        />
      </OptionControl>
      <OptionControl>
        <label
          htmlFor="resolution-control-height"
          className="resolution-control-label"
        >
          Height
          {resolution.height ? renderResetLink('height') : null}
        </label>

        <input
          id="resolution-control-height"
          type="number"
          placeholder="auto"
          step={8}
          value={resolution.height || ''}
          onChange={(event): void => {
            updateResolutionOptions('height', event.target.value);
          }}
        />
      </OptionControl>
    </>
  );
};

export default ResolutionControl;
