import React, { useState } from 'react';
import './OptionsPanel.css';
import OptionsList from '../OptionsList/OptionsList';
import FileTypeControl from '../FileTypeControl/FileTypeControl';
import QualityControl from '../QualityControl/QualityControl';
import CompressionControl from '../CompressionControl/CompressionControl';
import ResolutionControl from '../ResolutionControl/ResolutionControl';
import { IExportOptions } from '../../../interfaces/IExportOptions.interface';
import { getExportOptions } from '../../utilities/exportOptions';

const OptionsPanel: React.FunctionComponent = (): JSX.Element => {
  const [exportOptions, setExportOptions] = useState<IExportOptions>(
    getExportOptions()
  );

  return (
    <header className="options-panel">
      <OptionsList>
        <FileTypeControl
          fileType={exportOptions.fileType}
          exportOptionsChanged={() => {
            setExportOptions(getExportOptions());
          }}
        />
        {exportOptions.fileType === 'jpg' ||
        exportOptions.fileType === 'webp' ? (
          <QualityControl
            fileType={exportOptions.fileType}
            exportOptionsChanged={() => {
              setExportOptions(getExportOptions());
            }}
          />
        ) : null}
        {exportOptions.fileType === 'png' ? (
          <CompressionControl
            fileType={exportOptions.fileType}
            exportOptionsChanged={() => {
              setExportOptions(getExportOptions());
            }}
          />
        ) : null}
        <ResolutionControl
          exportOptionsChanged={() => {
            setExportOptions(getExportOptions());
          }}
        />
      </OptionsList>
    </header>
  );
};

export default OptionsPanel;
