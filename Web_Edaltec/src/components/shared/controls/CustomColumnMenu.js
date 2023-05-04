import {
    GridColumnMenuContainer, 
    GridFilterMenuItem, 
    SortGridMenuItems
} from '@material-ui/data-grid';

const CustomColumnMenu = (props) => {
    const { hideMenu, currentColumn } = props;
    return (
        <GridColumnMenuContainer
            hideMenu={hideMenu}
            currentColumn={currentColumn}
        >
            <SortGridMenuItems onClick={hideMenu} column={currentColumn} />
            <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
        </GridColumnMenuContainer>
    );
};

export default CustomColumnMenu;