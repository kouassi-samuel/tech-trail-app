import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './Home';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const onboardingDone = localStorage.getItem('onboarding_done');
    const authUser = localStorage.getItem('auth_user');
    if (!onboardingDone) {
      navigate('/onboarding', { replace: true });
    } else if (!authUser) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return <Home />;
};

export default Index;
