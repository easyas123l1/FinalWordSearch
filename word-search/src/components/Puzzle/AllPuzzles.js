import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPuzzles } from '../../store/actions/puzzleAction';

const AllPuzzles = ({getPuzzles}) => {
    
    const history = useHistory();
    return (
        <div>
            
        </div>
    )
}

const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps, { getPuzzles })(AllPuzzles);