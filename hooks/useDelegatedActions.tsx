import {useHeadlessDelegatedActions} from '@privy-io/react-auth';

export const useDelegatedActions = () => {
    const {delegateWallet} = useHeadlessDelegatedActions();
    return {delegateWallet};
}

