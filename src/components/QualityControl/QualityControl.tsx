import React, { Component } from 'react';
import IOptionControl from 'interfaces/IOptionControl.interface';
import OptionControl from '../OptionsItem/OptionControl';
import {
  updateExportOptionsByKey,
  getExportOptionsByKey,
} from '../../utilities/exportOptions';

interface IState {
  value: string | number;
  minValue: number;
  maxValue: number;
}

interface IProps extends IOptionControl {
  fileType: string;
}

export class QualityControl extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: this.getCurrentFileTypeQuality(),
      minValue: 1,
      maxValue: 100,
    };
  }

  getCurrentFileTypeQuality(): number {
    const currentFileTypeQuality: number = getExportOptionsByKey(
      this.props.fileType + 'Options',
      'quality'
    );

    return currentFileTypeQuality;
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.fileType !== this.props.fileType) {
      this.setState({ value: this.getCurrentFileTypeQuality() });
    }
  }

  change(event: React.FormEvent<HTMLInputElement>) {
    let value: number = Number(event.currentTarget.value);

    if (value > this.state.maxValue) {
      value = this.state.maxValue;
    } else if (value < this.state.minValue) {
      value = this.state.minValue;
    }

    updateExportOptionsByKey(value, this.props.fileType + 'Options', 'quality');
    this.setState({ value });
  }

  render() {
    return (
      <OptionControl isChild={true}>
        <label htmlFor="quality-control">
          Quality ({this.state.minValue}-{this.state.maxValue}%)
        </label>
        <input
          type="number"
          id="quality-control"
          min={this.state.minValue}
          max={this.state.maxValue}
          value={this.state.value || ''}
          onChange={(event) => this.change(event)}
          step={1}
        />
        {/* <span className="options-item__value">{this.state.value}</span> */}
      </OptionControl>
    );
  }
}

export default QualityControl;
