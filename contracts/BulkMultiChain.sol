// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@routerprotocol/router-crosstalk/contracts/RouterCrossTalk.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract BulkMultiChain is ERC20, AccessControl, RouterCrossTalk {
    uint256 private crossChainGas;

    struct BulkData {
        address _to;
        uint8 _chainID;
        uint256 _amt;
    }

    constructor(address _genericHandler)
        RouterCrossTalk(_genericHandler)
        ERC20("Payroll Router", "PYRLR")
        AccessControl()
    {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function mint(address _to, uint256 _amt)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _mint(_to, _amt);
    }

    function burn(address _to, uint256 _amt)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _burn(_to, _amt);
    }

    // Admin Functions for Cross Talk Start

    function setLinker(address _addr) external onlyRole(DEFAULT_ADMIN_ROLE) {
        setLink(_addr);
    }

    function setFeesToken(address _feeToken)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        setFeeToken(_feeToken);
    }

    function _approveFees(address _feeToken, uint256 _value) external {
        approveFees(_feeToken, _value);
    }

    function setCrossChainGas(uint256 _gas)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        crossChainGas = _gas;
    }

    function fetchCrossChainGas() external view returns (uint256) {
        return crossChainGas;
    }

    // Admin Functions for Cross Talk End

    // Cross Chain ERC20 Fx Start

    // Send
    function bulkTransferCrossChain(BulkData[] memory data)
        external
        returns (bool)
    {
        // calculate gas
        for (uint8 i = 0; i < data.length; i++) {
            _burn(msg.sender, data[i]._amt);
            _sendCrossChain(data[i]._chainID, data[i]._to, data[i]._amt);
        }

        return true;
    }

    function transferCrossChain(
        uint8 _chainID,
        address _to,
        uint256 _amt
    ) external returns (bool) {
        _burn(msg.sender, _amt);
        _sendCrossChain(_chainID, _to, _amt);
        return true;
    }

    function _sendCrossChain(
        uint8 _chainID,
        address _to,
        uint256 _amt
    ) internal returns (bool) {
        bytes4 _selector = bytes4(
            keccak256("ReciveCrossChain(address,uint256)")
        );
        bytes memory _data = abi.encode(_to, _amt);
        (bool success, bytes32 b) = routerSend(
            _chainID,
            _selector,
            _data,
            3000000,
            crossChainGas
        );
        return success;
    }

    //Send

    // Recive

    function _routerSyncHandler(bytes4 _interface, bytes memory _data)
        internal
        virtual
        override
        returns (bool, bytes memory)
    {
        (bool success, bytes memory returnData) = address(this).call(
            abi.encodeWithSelector(_interface, _data)
        );
        return (success, returnData);
    }

    function ReciveCrossChain(address _to, uint256 _amt) external isSelf {
        //        (address _to , uint256 _amt) = abi.decode(_data, ( address , uint256 ));
        _mint(_to, _amt);
    }
    // Receive
    // Cross-chain ERC20 Fx End
}
