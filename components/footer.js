import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Footer(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'© Copyright '}
            {new Date().getFullYear()}
            {' '}
            <Link color="inherit" href="https://zhaoliru.cn/">
                Hanrui Shen
            </Link>
            {' .'}
        </Typography>
    );
}
