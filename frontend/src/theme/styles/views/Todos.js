import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  filterLeft: {
    width: '100%',
    float: 'left',
    display: 'flex',
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'end',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: 5,
    },
  },
  filterRight: {
    width: '20%',
    float: 'left',
    justifyContent: 'flex-end',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: 5,
    },
  },

  searchFilterBtn: {
    marginLeft: 10,
    minHeight: 36,
  },
  moveRight: {
    marginLeft: 'auto',
  },
  addNewBtn: {
    minHeight: 36,
  },
  noRecordFoundText: {
    color: 'red',
    padding: '2rem !important',
    fontSize: '1rem !important',
  },
}));

export default useStyles;
