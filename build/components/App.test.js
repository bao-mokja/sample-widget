"use strict";

var _react = _interopRequireDefault(require("react"));

require("@testing-library/jest-dom/extend-expect");

var _App = _interopRequireDefault(require("./App"));

var _react2 = require("@testing-library/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('App', () => {
  it('renders ansd increments counter', () => {
    const {
      getByText,
      getByTitle,
      asFragment
    } = (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_App.default, {
      initialData: {
        appName: 'TEST'
      }
    }));
    expect(getByText('TEST')).toMatchInlineSnapshot(`
      <h1>
        TEST
      </h1>
    `);

    const button = _react2.screen.getByTitle('increment');

    _react2.fireEvent.click(button);

    expect(getByTitle('increment')).toHaveTextContent('1');
    expect(asFragment()).toMatchSnapshot();
  });
});