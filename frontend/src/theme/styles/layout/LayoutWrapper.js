const Style = (theme) => ({
  wrapper: {
    display: 'flex',
    minHeight: '95vh',
    maxWidth: 'none',
    flexDirection: 'column',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
});

export default Style;
