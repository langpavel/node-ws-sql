import React from 'react';
import PropTypes from 'prop-types';

const MIN_LINES = 3;

export default class AceEditor extends React.Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    defaultValue: PropTypes.string,
    mode: PropTypes.string,
    theme: PropTypes.string,
    onExecute: PropTypes.func,
  };

  static defaultProps = {
    mode: 'pgsql',
    theme: 'tomorrow_night_bright',
  }

  state = {
    lineCount: 1,
  };

  focus = () => this.editor && this.editor.focus();

  setValue = (val) => this.session && this.session.setValue(val);

  getValue = () => this.session ? this.session.getValue() : this.props.defaultValue;

  componentDidMount() {
    const { mode, theme } = this.props;

    this.editor = window.ace.edit(this.editorDomNode);
    this.editor.setTheme(`ace/theme/${theme}`);
    this.editor.setShowPrintMargin(false);
    this.editor.setAutoScrollEditorIntoView(true);
    // this.editor.setHighlightActiveLine(false);

    if (this.props.onExecute) {
      this.editor.commands.addCommand({
        name: 'execute',
        // I haven't Mac, so I cannot test `Command-Enter`
        bindKey: { win: 'Ctrl-Enter', mac: 'Command-Enter' },
        exec: (editor) => {
          if (!this.props.onExecute) return;
          this.props.onExecute(editor.getValue())
          editor.selectAll();
        },
        readOnly: false // false if this command should not apply in readOnly mode
      });
    }

    this.session = this.editor.getSession();
    this.session.setMode(`ace/mode/${mode}`);
    this.session.setTabSize(4);
    this.session.setUseSoftTabs(true);
    this.session.setUseWrapMode(false);

    this.editor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: false,
    });
    
    this.session.on('change', this.handleChange);

    if (this.props.defaultValue) this.editor.setValue(this.props.defaultValue);
    if (this.props.autoFocus) this.focus();
  }

  componentWillUnmount() {
    if (this.editor) {
      this.editor.destroy();
      this.editor = null;
      this.session = null;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.lineCount !== nextState.lineCount;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.lineCount !== prevState.lineCount) {
      this.editor.resize();
    }
  }

  handleChange = (...args) => {
    const lineCount = this.session.getLength();
    this.setState({ lineCount });
  }

  render() {
    console.log('AceEditor.render');
    const { className, defaultValue } = this.props;
    const currentLines = this.session ? this.session.getLength() : MIN_LINES;
    const style = {
      height: `${Math.max(currentLines, MIN_LINES) * 16}px`,
    };
    return (
      <div
        ref={ref => this.editorDomNode = ref}
        className={className}
        style={style}
      />
    )
  }

  //  render() {
  //    const { defaultValue } = this.props;
  //    const lines = 3;
  //    const fontSize = 14;
  //    const height = lines * (fontSize + 1);
  //
  //    return (
  //      <AceEditor
  //        mode="pgsql"
  //        theme="tomorrow_night_bright"
  //        name="prompt"
  //        onLoad={this.handleLoad}
  //        onChange={this.handleChange}
  //        fontSize={fontSize}
  //        showPrintMargin={false}
  //        showGutter
  //        highlightActiveLine={false}
  //        defaultValue={defaultValue}
  //        width="100%"
  //        height={`${height}px`}
  //        setOptions={{
  //          autoScrollEditorIntoView: true,
  //          showLineNumbers: true,
  //          fontSize: 13,
  //          minLines: 3,
  //          useSoftTabs: true,
  //          tabSize: 2,
  //        }}
  //      />
  //    );
  //  }
}
