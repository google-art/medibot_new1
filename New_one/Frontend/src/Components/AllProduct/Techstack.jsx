import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  ChevronRight,
  ChevronLeft,
  Store,
  Briefcase,
  ShoppingCart,
  Rocket,
  User,
  Target,
  TrendingUp,
  MessageSquare,
  BarChart3,
  Cog,
  Users,
  DollarSign,
  Check,
  X,
  ExternalLink,
  Download,
  Share2,
  RefreshCw,
  Info,
  Star,
  Sparkles,
  AlertCircle,
  ArrowRight,
  Search,
  Plus,
  Minus,
  Mail,
  Code,
  Database,
  CreditCard,
  UserPlus,
  FileText,
  Activity,
  Settings,
  Lightbulb,
  Package,
  Eye,
  Upload,
  MapPin,
  Trash2,
  Edit2,
  Printer,
  Copy,
  CheckSquare,
  Send,
  Save,
} from 'lucide-react';

// Enhanced Component placeholders
const Button = ({ children, className, onClick, disabled, ...props }) => (
  <button
    className={`px-4 py-2 font-bold transition-all ${className}`}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ className, ...props }) => (
  <input className={`px-3 py-2 border ${className}`} {...props} />
);

const Label = ({ children, className }) => (
  <label className={`block font-medium ${className}`}>{children}</label>
);

const Slider = ({ value, onValueChange, min, max, step, className }) => (
  <input
    type="range"
    value={value}
    onChange={(e) => onValueChange([parseInt(e.target.value)])}
    min={min}
    max={max}
    step={step}
    className={`w-full ${className}`}
  />
);

export function TechStackPage() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [wizardData, setWizardData] = useState({
    businessType: null,
    goals: [],
    teamSize: 5,
    skillLevel: 'beginner',
    budget: null,
    existingTools: [],
  });
  const [selectedTool, setSelectedTool] = useState(null);
  const [explainMode, setExplainMode] = useState(false);

  const wizardSteps = ['businessType', 'goals', 'teamSize', 'budget', 'existingTools'];
  const currentStepIndex = wizardSteps.indexOf(currentScreen);
  const progress = currentStepIndex >= 0 ? ((currentStepIndex + 1) / wizardSteps.length) * 100 : 0;

  const handleNext = () => {
    if (currentScreen === 'existingTools') {
      setCurrentScreen('processing');
      setTimeout(() => setCurrentScreen('dashboard'), 3000);
    } else if (currentStepIndex >= 0 && currentStepIndex < wizardSteps.length - 1) {
      setCurrentScreen(wizardSteps[currentStepIndex + 1]);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentScreen(wizardSteps[currentStepIndex - 1]);
    } else if (['dashboard', 'insights', 'simulator', 'export'].includes(currentScreen)) {
      setCurrentScreen('landing');
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 w-40 h-40 border-4 border-cyan-500 opacity-20"
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1, 0.9, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-32 h-32 bg-yellow-500 opacity-10"
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, 20, 0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-10 w-24 h-24 border-4 border-yellow-500 opacity-20"
          animate={{
            rotate: [360, 270, 180, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {currentScreen === 'landing' && (
            <LandingScreen onStart={() => setCurrentScreen('businessType')} />
          )}

          {wizardSteps.includes(currentScreen) && (
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <WizardLayout
                progress={progress}
                currentStep={currentStepIndex + 1}
                totalSteps={wizardSteps.length}
                onBack={handleBack}
                onNext={handleNext}
                onSkip={handleSkip}
                explainMode={explainMode}
                onToggleExplain={() => setExplainMode(!explainMode)}
              >
                {currentScreen === 'businessType' && (
                  <BusinessTypeStep
                    selected={wizardData.businessType}
                    onSelect={(type) => setWizardData({ ...wizardData, businessType: type })}
                    explainMode={explainMode}
                  />
                )}
                {currentScreen === 'goals' && (
                  <GoalsStep
                    selected={wizardData.goals}
                    onToggle={(goal) => {
                      const goals = wizardData.goals.includes(goal)
                        ? wizardData.goals.filter((g) => g !== goal)
                        : [...wizardData.goals, goal];
                      setWizardData({ ...wizardData, goals });
                    }}
                    explainMode={explainMode}
                  />
                )}
                {currentScreen === 'teamSize' && (
                  <TeamSizeStep
                    teamSize={wizardData.teamSize}
                    skillLevel={wizardData.skillLevel}
                    onTeamSizeChange={(size) => setWizardData({ ...wizardData, teamSize: size })}
                    onSkillLevelChange={(level) => setWizardData({ ...wizardData, skillLevel: level })}
                    explainMode={explainMode}
                  />
                )}
                {currentScreen === 'budget' && (
                  <BudgetStep
                    selected={wizardData.budget}
                    onSelect={(budget) => setWizardData({ ...wizardData, budget })}
                    explainMode={explainMode}
                  />
                )}
                {currentScreen === 'existingTools' && (
                  <ExistingToolsStep
                    tools={wizardData.existingTools}
                    onAdd={(tool) => setWizardData({ ...wizardData, existingTools: [...wizardData.existingTools, tool] })}
                    onRemove={(tool) =>
                      setWizardData({
                        ...wizardData,
                        existingTools: wizardData.existingTools.filter((t) => t !== tool),
                      })
                    }
                    explainMode={explainMode}
                  />
                )}
              </WizardLayout>
            </motion.div>
          )}

          {currentScreen === 'processing' && <ProcessingScreen />}

          {currentScreen === 'dashboard' && (
            <DashboardScreen
              wizardData={wizardData}
              onToolSelect={setSelectedTool}
              onNavigate={setCurrentScreen}
            />
          )}

          {currentScreen === 'insights' && (
            <InsightsScreen wizardData={wizardData} onBack={() => setCurrentScreen('dashboard')} />
          )}

          {currentScreen === 'simulator' && (
            <SimulatorScreen wizardData={wizardData} onBack={() => setCurrentScreen('dashboard')} />
          )}

          {currentScreen === 'export' && (
            <ExportScreen wizardData={wizardData} onBack={() => setCurrentScreen('dashboard')} />
          )}
        </AnimatePresence>

        {/* Tool Detail Drawer */}
        <AnimatePresence>
          {selectedTool && (
            <ToolDetailDrawer tool={selectedTool} onClose={() => setSelectedTool(null)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Enhanced Landing Screen
function LandingScreen({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-4 py-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                  <Zap className="text-cyan-600" size={24} />
                </div>
                <div>
                  <span className="text-cyan-600 font-bold text-xs uppercase">TECH STACK WIZARD</span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl text-cyan-600 mb-3 tracking-tight leading-tight font-bold">
                    Build Your Perfect Tech Stack in Minutes
                  </h1>
                </div>
              </div>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                Answer a few questions. Get tools that fit your business.
              </p>
              <Button
                onClick={onStart}
                className="bg-cyan-500 hover:bg-cyan-600 text-white border-4 border-cyan-400 px-6 py-4 text-base font-bold uppercase transition-all hover:scale-105 rounded-xl shadow-lg"
              >
                <Zap size={20} className="mr-2" />
                Start Stack Wizard
              </Button>
              <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <Check className="text-cyan-500" size={14} />
                  <span>No login required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-yellow-500" size={14} />
                  <span>Takes 2 minutes</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="space-y-3">
              {[
                { icon: Mail, name: 'Email Marketing', color: 'cyan', desc: 'Automate your campaigns' },
                { icon: Database, name: 'Database', color: 'yellow', desc: 'Store and manage data' },
                { icon: CreditCard, name: 'Payments', color: 'cyan', desc: 'Process transactions' },
                { icon: Users, name: 'CRM', color: 'yellow', desc: 'Manage customer relationships' },
                { icon: BarChart3, name: 'Analytics', color: 'cyan', desc: 'Track performance metrics' },
              ].map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`border-4 ${
                      tool.color === 'cyan'
                        ? 'border-cyan-400 bg-gradient-to-r from-cyan-50 to-white'
                        : 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-white'
                    } p-3 flex items-center gap-3 hover:scale-105 transition-all duration-300 cursor-pointer rounded-xl shadow-sm`}
                  >
                    <div
                      className={`w-12 h-12 ${
                        tool.color === 'cyan'
                          ? 'bg-gradient-to-br from-cyan-500 to-cyan-600'
                          : 'bg-gradient-to-br from-yellow-500 to-yellow-600'
                      } border-2 border-white flex items-center justify-center rounded-lg shadow-lg`}
                    >
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-800 font-bold text-base">{tool.name}</span>
                      <p className="text-gray-600 text-xs">{tool.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Enhanced Wizard Layout - WITH SCROLLABLE CONTENT
function WizardLayout({
  progress,
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onSkip,
  explainMode,
  onToggleExplain,
  children,
}) {
  return (
    <div className="h-screen flex flex-col">
      {/* Header - REDUCED HEIGHT */}
      <div className="bg-white border-b-4 border-cyan-400 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Zap className="text-cyan-600" size={16} />
              </div>
              <div>
                <span className="text-cyan-600 text-xs font-semibold uppercase">
                  Tech Stack Wizard
                </span>
                <span className="text-gray-500 text-xs ml-2">• Step {currentStep} of {totalSteps}</span>
              </div>
            </div>
            <button
              onClick={onToggleExplain}
              className={`text-xs px-3 py-1.5 border-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                explainMode
                  ? 'border-yellow-400 bg-yellow-500 text-white'
                  : 'border-yellow-400 text-yellow-600 hover:bg-yellow-500 hover:text-white'
              }`}
            >
              <Lightbulb size={14} />
              {explainMode ? '✓ ' : ''}ELI5 Mode
            </button>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Content - SCROLLABLE */}
      <div className="flex-grow overflow-y-auto bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          {children}
        </div>
      </div>

      {/* Bottom Navigation - REDUCED HEIGHT */}
      <div className="bg-white border-t-4 border-cyan-400 sticky bottom-0 z-40 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex justify-between items-center gap-4">
            <Button
              onClick={onBack}
              disabled={currentStep === 1}
              className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all px-4 py-2 rounded-lg text-sm"
            >
              <ChevronLeft size={16} className="mr-1.5" />
              Back
            </Button>

            <button onClick={onSkip} className="text-gray-500 hover:text-gray-700 text-xs underline font-medium">
              Skip this step
            </button>

            <Button
              onClick={onNext}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-2 border-cyan-400 font-bold px-6 py-2 transition-all rounded-lg shadow-lg text-sm"
            >
              Continue
              <ChevronRight size={16} className="ml-1.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Business Type Step
function BusinessTypeStep({ selected, onSelect, explainMode }) {
  const types = [
    {
      id: 'startup',
      icon: Rocket,
      label: 'Startup',
      description: 'Building a new product or service',
      explain: 'Perfect for teams creating something new from scratch',
    },
    {
      id: 'agency',
      icon: Briefcase,
      label: 'Agency',
      description: 'Serving clients with projects',
      explain: 'For teams that work on multiple client projects',
    },
    {
      id: 'ecommerce',
      icon: ShoppingCart,
      label: 'E-commerce',
      description: 'Selling products online',
      explain: 'Great for online stores and retail businesses',
    },
    {
      id: 'saas',
      icon: Code,
      label: 'SaaS',
      description: 'Software as a Service',
      explain: 'For companies building subscription software',
    },
    {
      id: 'freelancer',
      icon: User,
      label: 'Freelancer',
      description: 'Independent professional',
      explain: 'Solo workers managing their own business',
    },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
            <Building2 className="text-cyan-600" size={20} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl text-cyan-600 font-bold">
              What Type of Business Are You?
            </h2>
            <p className="text-gray-600 text-sm mt-1">This helps us recommend the right tools for your needs</p>
          </div>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {types.map((type, index) => {
          const Icon = type.icon;
          const isSelected = selected === type.id;
          return (
            <motion.button
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelect(type.id)}
              className={`p-4 border-4 transition-all text-left group relative rounded-xl shadow-sm ${
                isSelected
                  ? 'border-cyan-400 bg-gradient-to-br from-cyan-50 to-white scale-105 shadow-lg'
                  : 'border-gray-300 bg-white hover:border-cyan-400 hover:bg-cyan-50 hover:scale-[1.02]'
              }`}
            >
              <div
                className={`w-14 h-14 mb-3 border-2 flex items-center justify-center transition-colors rounded-lg ${
                  isSelected ? 'bg-gradient-to-br from-cyan-500 to-cyan-600 border-white' : 'bg-gray-100 border-gray-300 group-hover:bg-cyan-500 group-hover:border-white'
                }`}
              >
                <Icon size={28} className={isSelected ? 'text-white' : 'text-gray-600 group-hover:text-white'} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{type.label}</h3>
              <p className="text-gray-600 text-xs mb-2">{type.description}</p>
              {explainMode && (
                <div className="mt-2 p-2 bg-yellow-50 rounded-lg border-2 border-yellow-400">
                  <p className="text-yellow-700 text-xs flex items-center gap-1.5">
                    <Lightbulb size={12} />
                    {type.explain}
                  </p>
                </div>
              )}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-600 border-2 border-white flex items-center justify-center rounded-full shadow-lg"
                >
                  <Check size={16} className="text-white" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// Enhanced Goals Step
function GoalsStep({ selected, onToggle, explainMode }) {
  const goals = [
    { id: 'sales', icon: TrendingUp, label: 'Sales', explain: 'Track deals and manage customer relationships' },
    { id: 'automation', icon: Zap, label: 'Automation', explain: 'Save time with automated workflows' },
    { id: 'marketing', icon: MessageSquare, label: 'Marketing', explain: 'Reach more customers and grow brand' },
    { id: 'ops', icon: Cog, label: 'Operations', explain: 'Manage projects and internal processes' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', explain: 'Track performance and make data-driven decisions' },
    { id: 'hr', icon: Users, label: 'HR & Team', explain: 'Hire, onboard, and manage your team' },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
            <Target className="text-yellow-600" size={20} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl text-yellow-600 font-bold">
              What Are Your Primary Goals?
            </h2>
            <p className="text-gray-600 text-sm mt-1">Select all that apply • We'll prioritize tools for these areas</p>
          </div>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((goal, index) => {
          const Icon = goal.icon;
          const isSelected = selected.includes(goal.id);
          return (
            <motion.button
              key={goal.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onToggle(goal.id)}
              className={`p-4 border-4 transition-all relative rounded-xl shadow-sm ${
                isSelected
                  ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-white scale-105 shadow-lg'
                  : 'border-gray-300 bg-white hover:border-yellow-400 hover:bg-yellow-50 hover:scale-[1.02]'
              }`}
            >
              <div
                className={`w-12 h-12 mb-3 border-2 flex items-center justify-center transition-colors rounded-lg ${
                  isSelected ? 'bg-gradient-to-br from-yellow-500 to-yellow-600 border-white' : 'bg-gray-100 border-gray-300'
                }`}
              >
                <Icon size={24} className={isSelected ? 'text-white' : 'text-gray-600'} />
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-1">{goal.label}</h3>
              {explainMode && (
                <div className="mt-2 p-2 bg-cyan-50 rounded-lg border-2 border-cyan-400">
                  <p className="text-cyan-700 text-xs flex items-center gap-1.5">
                    <Lightbulb size={12} />
                    {goal.explain}
                  </p>
                </div>
              )}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-600 border-2 border-white flex items-center justify-center rounded-full shadow-lg"
                >
                  <Check size={16} className="text-white" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// Enhanced Team Size Step
function TeamSizeStep({
  teamSize,
  skillLevel,
  onTeamSizeChange,
  onSkillLevelChange,
  explainMode,
}) {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
            <Users className="text-cyan-600" size={20} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl text-cyan-600 font-bold">
              Tell Us About Your Team
            </h2>
            <p className="text-gray-600 text-sm mt-1">Team size and technical comfort level</p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Team Size Slider */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="border-4 border-cyan-400 bg-gradient-to-br from-cyan-50 to-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-gray-800 font-bold text-lg">Team Size</Label>
              <div className="text-3xl font-bold text-cyan-600">{teamSize}</div>
            </div>
            <Slider
              value={[teamSize]}
              onValueChange={([value]) => onTeamSizeChange(value)}
              min={1}
              max={100}
              step={1}
              className="mb-3"
            />
            <div className="flex justify-between text-gray-500 text-xs">
              <span className="font-medium">Solo</span>
              <span className="font-medium">Small Team</span>
              <span className="font-medium">Medium</span>
              <span className="font-medium">Enterprise</span>
            </div>
            {explainMode && (
              <div className="mt-3 p-2 bg-yellow-50 rounded-lg border-2 border-yellow-400">
                <p className="text-yellow-700 text-xs flex items-center gap-1.5">
                  <Lightbulb size={14} />
                  Larger teams need more collaboration and project management tools
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Skill Level Toggle */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="border-4 border-yellow-400 bg-gradient-to-br from-yellow-50 to-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Cog className="text-yellow-600" size={16} />
              </div>
              <Label className="text-gray-800 font-bold text-lg">Technical Skill Level</Label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onSkillLevelChange('beginner')}
                className={`p-4 border-3 transition-all relative rounded-xl ${
                  skillLevel === 'beginner'
                    ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-white scale-105 shadow-lg'
                    : 'border-gray-300 bg-white hover:border-yellow-400 hover:bg-yellow-50'
                }`}
              >
                <div className="text-4xl mb-2">🌱</div>
                <h3 className="text-base font-bold text-gray-800 mb-1">Beginner</h3>
                <p className="text-gray-600 text-xs">User-friendly tools only</p>
                {skillLevel === 'beginner' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-600 border-2 border-white flex items-center justify-center rounded-full shadow-lg"
                  >
                    <Check size={16} className="text-white" />
                  </motion.div>
                )}
              </button>
              <button
                onClick={() => onSkillLevelChange('advanced')}
                className={`p-4 border-3 transition-all relative rounded-xl ${
                  skillLevel === 'advanced'
                    ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-white scale-105 shadow-lg'
                    : 'border-gray-300 bg-white hover:border-yellow-400 hover:bg-yellow-50'
                }`}
              >
                <div className="text-4xl mb-2">🚀</div>
                <h3 className="text-base font-bold text-gray-800 mb-1">Advanced</h3>
                <p className="text-gray-600 text-xs">Technical tools welcome</p>
                {skillLevel === 'advanced' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-600 border-2 border-white flex items-center justify-center rounded-full shadow-lg"
                  >
                    <Check size={16} className="text-white" />
                  </motion.div>
                )}
              </button>
            </div>
            {explainMode && (
              <div className="mt-3 p-2 bg-cyan-50 rounded-lg border-2 border-cyan-400">
                <p className="text-cyan-700 text-xs flex items-center gap-1.5">
                  <Lightbulb size={14} />
                  Beginner = No-code, visual tools • Advanced = More powerful, flexible options
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Enhanced Budget Step
function BudgetStep({ selected, onSelect, explainMode }) {
  const budgets = [
    {
      id: 'free',
      icon: '🌱',
      label: 'Free',
      subtitle: 'Start with $0/month',
      features: ['Free tools only', 'Limited features', 'Good for testing'],
      explain: 'Perfect for bootstrapped startups and side projects',
    },
    {
      id: 'mid',
      icon: '💼',
      label: 'Growing',
      subtitle: '$50-500/month',
      features: ['Mix of free & paid', 'Core features', 'Room to scale'],
      explain: 'Balanced approach for small teams ready to invest',
    },
    {
      id: 'premium',
      icon: '🚀',
      label: 'Premium',
      subtitle: '$500+/month',
      features: ['Best-in-class tools', 'Full features', 'Enterprise grade'],
      explain: 'For funded companies prioritizing quality and support',
    },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
            <DollarSign className="text-yellow-600" size={20} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl text-yellow-600 font-bold">
              What's Your Budget Comfort?
            </h2>
            <p className="text-gray-600 text-sm mt-1">Choose what fits your current stage</p>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {budgets.map((budget, index) => {
          const isSelected = selected === budget.id;
          return (
            <motion.button
              key={budget.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelect(budget.id)}
              className={`p-6 border-4 transition-all text-left relative rounded-xl shadow-sm ${
                isSelected
                  ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-white scale-105 shadow-lg'
                  : 'border-gray-300 bg-white hover:border-yellow-400 hover:bg-yellow-50 hover:scale-[1.02]'
              }`}
            >
              <div className="text-5xl mb-3">{budget.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{budget.label}</h3>
              <p className="text-gray-600 mb-4">{budget.subtitle}</p>
              <ul className="space-y-2 mb-4">
                {budget.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs text-gray-700">
                    <div className="w-5 h-5 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-cyan-600" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              {explainMode && (
                <div className="mt-3 p-2 bg-cyan-50 rounded-lg border-2 border-cyan-400">
                  <p className="text-cyan-700 text-xs flex items-center gap-1.5">
                    <Lightbulb size={14} />
                    {budget.explain}
                  </p>
                </div>
              )}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 border-2 border-white flex items-center justify-center rounded-full shadow-lg"
                >
                  <Check size={20} className="text-white" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// Enhanced Existing Tools Step
function ExistingToolsStep({ tools, onAdd, onRemove, explainMode }) {
  const [inputValue, setInputValue] = useState('');

  const popularTools = [
    'Slack', 'Notion', 'Google Workspace', 'Zoom', 'Trello',
    'Asana', 'HubSpot', 'Salesforce', 'Stripe', 'Shopify',
  ];

  const handleAdd = () => {
    if (inputValue.trim() && !tools.includes(inputValue.trim())) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
            <Package className="text-cyan-600" size={20} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl text-cyan-600 font-bold">
              What Tools Are You Already Using?
            </h2>
            <p className="text-gray-600 text-sm mt-1">We'll recommend tools that integrate well • Optional step</p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Search Input */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="border-4 border-cyan-400 bg-gradient-to-br from-cyan-50 to-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Search className="text-cyan-600" size={16} />
              </div>
              <Label className="text-gray-800 font-bold text-base">Add Tool</Label>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                  placeholder="Type tool name..."
                  className="w-full pl-8 pr-3 py-2 border-2 border-gray-300 bg-white text-gray-800 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 rounded-lg text-sm"
                />
              </div>
              <Button
                onClick={handleAdd}
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-2 border-cyan-400 px-4 rounded-lg shadow-sm"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Popular Tools */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="text-yellow-500" size={16} />
            <Label className="text-gray-700 font-medium text-sm">Or select from popular tools:</Label>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularTools.map((tool) => {
              const isAdded = tools.includes(tool);
              return (
                <button
                  key={tool}
                  onClick={() => (isAdded ? onRemove(tool) : onAdd(tool))}
                  className={`px-3 py-1.5 border-2 transition-all text-xs font-semibold rounded-lg ${
                    isAdded
                      ? 'border-cyan-400 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-sm'
                      : 'border-gray-300 text-gray-700 hover:border-cyan-400 hover:bg-cyan-50'
                  }`}
                >
                  {isAdded && <Check size={12} className="inline mr-1" />}
                  {tool}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Selected Tools */}
        {tools.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="border-4 border-yellow-400 bg-gradient-to-br from-yellow-50 to-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <CheckSquare className="text-yellow-600" size={16} />
                  </div>
                  <Label className="text-gray-800 font-bold text-sm">Your Tools ({tools.length})</Label>
                </div>
                <span className="text-xs text-gray-500">Click to remove</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <div
                    key={tool}
                    className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white border-2 border-cyan-400 flex items-center gap-1.5 rounded-lg shadow-sm"
                  >
                    <span className="font-semibold text-xs">{tool}</span>
                    <button 
                      onClick={() => onRemove(tool)} 
                      className="hover:scale-110 transition-transform bg-white/20 p-0.5 rounded"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {explainMode && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <div className="p-3 bg-cyan-50 rounded-xl border-4 border-cyan-400">
              <div className="flex items-center gap-2">
                <Lightbulb className="text-yellow-600" size={16} />
                <p className="text-cyan-700 text-xs">
                  💡 Knowing your existing tools helps us suggest compatible solutions and avoid overlaps
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Enhanced Processing Screen
function ProcessingScreen() {
  const steps = [
    'Analyzing your goals...',
    'Matching tools with your team size...',
    'Filtering by budget range...',
    'Checking integration compatibility...',
    'Optimizing for long-term growth...',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-cyan-50 to-yellow-50"
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          className="w-32 h-32 mx-auto mb-6 border-4 border-cyan-400 rounded-full"
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1, 1.1, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center rounded-full">
            <Sparkles size={48} className="text-white" />
          </div>
        </motion.div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <Zap className="text-yellow-500" size={24} />
          <h2 className="text-3xl sm:text-4xl text-cyan-600 font-bold">
            Building Your Perfect Stack...
          </h2>
        </div>

        <div className="space-y-3">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.5 }}
              className="flex items-center gap-2 border-2 border-cyan-400 bg-white p-3 rounded-xl shadow-sm"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.5 + 0.3 }}
                className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-600 border-2 border-white flex items-center justify-center rounded-full flex-shrink-0 shadow-lg"
              >
                <Check size={16} className="text-white" />
              </motion.div>
              <span className="text-gray-800 text-left text-sm font-medium">{step}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Enhanced Dashboard Screen - WITH SCROLLABLE CONTENT
function DashboardScreen({ wizardData, onToolSelect, onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock tools data
  const mockTools = [
    {
      id: '1',
      name: 'HubSpot CRM',
      category: 'CRM',
      icon: Users,
      reason: 'Perfect for sales teams under 10 people',
      difficulty: 'Beginner',
      cost: 'Free',
      fitScore: 95,
      badges: ['Best Fit', 'Popular'],
      description: 'All-in-one CRM platform',
      pros: ['Easy to use', 'Great free tier', 'Excellent support'],
      cons: ['Can get expensive', 'Limited customization on free plan'],
      integrations: ['Gmail', 'Slack', 'Mailchimp'],
      alternatives: ['Pipedrive', 'Salesforce'],
    },
    {
      id: '2',
      name: 'Mailchimp',
      category: 'Marketing',
      icon: Mail,
      reason: 'Best email marketing for beginners',
      difficulty: 'Beginner',
      cost: 'Free',
      fitScore: 92,
      badges: ['Popular'],
      description: 'Email marketing platform',
      pros: ['Intuitive design', 'Generous free tier', 'Great templates'],
      cons: ['Pricing scales quickly', 'Limited automation on free'],
      integrations: ['Shopify', 'WordPress', 'Facebook'],
      alternatives: ['ConvertKit', 'SendGrid'],
    },
    {
      id: '3',
      name: 'Stripe',
      category: 'Finance',
      icon: CreditCard,
      reason: 'Industry standard for online payments',
      difficulty: 'Advanced',
      cost: 'Paid',
      fitScore: 98,
      badges: ['Best Fit'],
      description: 'Payment processing',
      pros: ['Developer friendly', 'Global support', 'Reliable'],
      cons: ['Requires technical setup', 'Transaction fees'],
      integrations: ['Shopify', 'WooCommerce', 'Webflow'],
      alternatives: ['PayPal', 'Square'],
    },
    {
      id: '4',
      name: 'Google Analytics',
      category: 'Analytics',
      icon: BarChart3,
      reason: 'Free and powerful web analytics',
      difficulty: 'Beginner',
      cost: 'Free',
      fitScore: 90,
      badges: ['Popular'],
      description: 'Web analytics platform',
      pros: ['Completely free', 'Industry standard', 'Deep insights'],
      cons: ['Steep learning curve', 'Privacy concerns'],
      integrations: ['Google Ads', 'Search Console', 'BigQuery'],
      alternatives: ['Mixpanel', 'Plausible'],
    },
    {
      id: '5',
      name: 'Notion',
      category: 'Operations',
      icon: FileText,
      reason: 'All-in-one workspace for small teams',
      difficulty: 'Beginner',
      cost: 'Free',
      fitScore: 88,
      badges: ['Popular'],
      description: 'Workspace & docs',
      pros: ['Very flexible', 'Great collaboration', 'Beautiful UI'],
      cons: ['Can be overwhelming', 'Slow with large databases'],
      integrations: ['Slack', 'Google Drive', 'Figma'],
      alternatives: ['Coda', 'Airtable'],
    },
    {
      id: '6',
      name: 'BambooHR',
      category: 'HR',
      icon: UserPlus,
      reason: 'Best HR software for growing teams',
      difficulty: 'Beginner',
      cost: 'Paid',
      fitScore: 85,
      badges: [],
      description: 'HR management',
      pros: ['User friendly', 'Comprehensive features', 'Great support'],
      cons: ['Expensive for small teams', 'Limited customization'],
      integrations: ['Slack', 'G Suite', 'PayPal'],
      alternatives: ['Gusto', 'Rippling'],
    },
  ];

  const categories = [
    { id: 'all', label: 'All Tools', icon: Sparkles },
    { id: 'CRM', label: 'CRM', icon: Users },
    { id: 'Marketing', label: 'Marketing', icon: MessageSquare },
    { id: 'HR', label: 'HR', icon: UserPlus },
    { id: 'Finance', label: 'Finance', icon: DollarSign },
    { id: 'Operations', label: 'Operations', icon: Settings },
    { id: 'Analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const filteredTools = selectedCategory === 'all' 
    ? mockTools 
    : mockTools.filter((tool) => tool.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50"
    >
      {/* Header - REDUCED HEIGHT */}
      <div className="border-b-4 border-cyan-400 bg-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                <Zap className="text-cyan-600" size={24} />
              </div>
              <div>
                <h1 className="text-2xl text-cyan-600 font-bold uppercase">
                  Your Recommended Stack
                </h1>
                <p className="text-gray-600 text-sm">Personalized for {wizardData.businessType} • Team of {wizardData.teamSize}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => onNavigate('insights')}
                className="border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 px-3 py-1.5 rounded-lg text-sm"
              >
                <Activity size={14} className="mr-1.5" />
                Insights
              </Button>
              <Button
                onClick={() => onNavigate('export')}
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-2 border-cyan-400 px-3 py-1.5 rounded-lg shadow-sm text-sm"
              >
                <Download size={14} className="mr-1.5" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="grid lg:grid-cols-4 gap-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="border-4 border-cyan-400 bg-gradient-to-b from-cyan-50 to-white p-3 rounded-xl sticky top-20 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <List className="text-cyan-600" size={16} />
                <h3 className="text-gray-800 font-bold uppercase text-xs">Categories</h3>
              </div>
              <div className="space-y-1.5">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 border-2 transition-all text-left rounded-lg text-sm ${
                        selectedCategory === cat.id
                          ? 'border-cyan-400 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-sm'
                          : 'border-gray-300 text-gray-700 hover:border-cyan-400 hover:bg-cyan-50'
                      }`}
                    >
                      <Icon size={16} />
                      <span className="font-semibold">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tools Grid - SCROLLABLE IF NEEDED */}
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredTools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-4 border-gray-300 bg-white p-4 hover:border-cyan-400 transition-all group cursor-pointer rounded-xl shadow-sm hover:shadow-lg"
                    onClick={() => onToolSelect(tool)}
                  >
                    {/* Tool Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 border-2 border-white flex items-center justify-center rounded-lg shadow-lg">
                        <Icon size={24} className="text-white" />
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <div className="px-2 py-0.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-xs font-bold border border-white rounded-full shadow-sm">
                          {tool.fitScore}% FIT
                        </div>
                      </div>
                    </div>

                    {/* Tool Name */}
                    <h3 className="text-lg font-bold text-gray-800 mb-1.5 group-hover:text-cyan-600 transition-colors">
                      {tool.name}
                    </h3>

                    {/* Reason */}
                    <p className="text-gray-600 text-xs mb-3">{tool.reason}</p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className={`px-1.5 py-0.5 text-xs font-semibold border rounded ${
                        tool.difficulty === 'Beginner'
                          ? 'border-cyan-400 text-cyan-600 bg-cyan-50'
                          : 'border-yellow-400 text-yellow-600 bg-yellow-50'
                      }`}>
                        {tool.difficulty}
                      </span>
                      <span className={`px-1.5 py-0.5 text-xs font-semibold border rounded ${
                        tool.cost === 'Free'
                          ? 'border-cyan-400 text-cyan-600 bg-cyan-50'
                          : tool.cost === 'Paid'
                          ? 'border-yellow-400 text-yellow-600 bg-yellow-50'
                          : 'border-gray-400 text-gray-600 bg-gray-50'
                      }`}>
                        {tool.cost}
                      </span>
                      {tool.badges.map((badge) => (
                        <span
                          key={badge}
                          className="px-1.5 py-0.5 text-xs font-semibold bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border border-white rounded shadow-sm"
                        >
                          ★ {badge}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1.5">
                      <Button className="flex-1 border-2 border-cyan-400 text-cyan-600 hover:bg-cyan-50 text-xs py-1.5 rounded-lg">
                        View Details
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Enhanced Tool Detail Drawer
function ToolDetailDrawer({ tool, onClose }) {
  const Icon = tool.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
        className="bg-white border-4 border-cyan-400 max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b-4 border-cyan-400 p-4 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 border-4 border-white flex items-center justify-center rounded-lg shadow-lg">
              <Icon size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">{tool.name}</h2>
              <p className="text-gray-600 text-sm">{tool.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 border-2 border-gray-300 text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Fit Score */}
          <div className="border-4 border-cyan-400 bg-gradient-to-r from-cyan-50 to-white p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-800 font-bold text-sm">Fit Score</span>
              <span className="text-3xl font-bold text-cyan-600">{tool.fitScore}%</span>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600"
                initial={{ width: 0 }}
                animate={{ width: `${tool.fitScore}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>

          {/* Why it fits */}
          <div>
            <h3 className="text-gray-800 font-bold mb-2 uppercase text-xs">Why This Fits Your Business</h3>
            <p className="text-gray-700 border-l-4 border-yellow-400 pl-3 py-1.5 bg-yellow-50 rounded-r-lg text-sm">{tool.reason}</p>
          </div>

          {/* Pros & Cons */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="border-2 border-cyan-400 bg-gradient-to-b from-cyan-50 to-white p-3 rounded-xl">
              <h4 className="text-cyan-600 font-bold mb-2 flex items-center gap-1.5 text-sm">
                <Check size={16} />
                Pros
              </h4>
              <ul className="space-y-1.5">
                {tool.pros.map((pro) => (
                  <li key={pro} className="text-gray-700 text-xs flex items-start gap-1.5">
                    <span className="text-cyan-500 mt-0.5">✓</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-2 border-yellow-400 bg-gradient-to-b from-yellow-50 to-white p-3 rounded-xl">
              <h4 className="text-yellow-600 font-bold mb-2 flex items-center gap-1.5 text-sm">
                <AlertCircle size={16} />
                Cons
              </h4>
              <ul className="space-y-1.5">
                {tool.cons.map((con) => (
                  <li key={con} className="text-gray-700 text-xs flex items-start gap-1.5">
                    <span className="text-yellow-500 mt-0.5">✗</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Integrations */}
          <div>
            <h3 className="text-gray-800 font-bold mb-2 uppercase text-xs">Integrates With</h3>
            <div className="flex flex-wrap gap-1.5">
              {tool.integrations.map((integration) => (
                <div key={integration} className="px-2 py-1 border-2 border-gray-300 text-gray-700 text-xs rounded-lg bg-white">
                  {integration}
                </div>
              ))}
            </div>
          </div>

          {/* Alternatives */}
          <div>
            <h3 className="text-gray-800 font-bold mb-2 uppercase text-xs">Alternatives</h3>
            <div className="flex flex-wrap gap-1.5">
              {tool.alternatives.map((alt) => (
                <div key={alt} className="px-2 py-1 border-2 border-yellow-400 text-yellow-600 text-xs rounded-lg bg-yellow-50">
                  {alt}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="grid sm:grid-cols-2 gap-3 pt-3 border-t-4 border-gray-300">
            <Button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-2 border-cyan-400 py-2 rounded-lg shadow-sm text-sm">
              <ExternalLink size={16} className="mr-1.5" />
              Visit Website
            </Button>
            <Button className="w-full border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 py-2 rounded-lg text-sm">
              <Star size={16} className="mr-1.5" />
              Save to Stack
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Enhanced Insights Screen - WITH SCROLLABLE CONTENT
function InsightsScreen({ wizardData, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50"
    >
      {/* Header */}
      <div className="border-b-4 border-cyan-400 bg-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <Button onClick={onBack} className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 px-3 py-1.5 rounded-lg text-sm">
              <ChevronLeft size={16} className="mr-1.5" />
              Back to Dashboard
            </Button>
            <div className="text-xs text-gray-500">AI-powered insights</div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
            <Activity className="text-cyan-600" size={20} />
          </div>
          <div>
            <h1 className="text-3xl text-cyan-600 font-bold">
              Stack Insights
            </h1>
            <p className="text-gray-600 text-sm">AI-powered analysis of your tech stack</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Stack Health Score */}
          <div className="border-4 border-cyan-400 bg-gradient-to-br from-cyan-50 to-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-cyan-600" size={16} />
              </div>
              <h2 className="text-xl text-gray-800 font-bold">Stack Health Score</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold text-cyan-600">92%</div>
              <div className="flex-1">
                <p className="text-gray-700 text-sm mb-1.5">Your stack is well-balanced and future-ready</p>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600"
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Risk Warnings */}
          <div className="border-4 border-yellow-400 bg-gradient-to-br from-yellow-50 to-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="text-yellow-600" size={16} />
              </div>
              <h2 className="text-xl text-yellow-600 font-bold">Things to Consider</h2>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-gray-700 text-sm">
                <span className="text-yellow-500 text-lg mt-0.5">•</span>
                Some tools may overlap in functionality - consider consolidating
              </li>
              <li className="flex items-start gap-2 text-gray-700 text-sm">
                <span className="text-yellow-500 text-lg mt-0.5">•</span>
                Budget may increase as your team grows
              </li>
            </ul>
          </div>

          {/* Future Needs */}
          <div className="border-4 border-cyan-400 bg-gradient-to-br from-cyan-50 to-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Lightbulb className="text-cyan-600" size={16} />
              </div>
              <h2 className="text-xl text-cyan-600 font-bold">Tools You'll Need Later</h2>
            </div>
            <p className="text-gray-600 text-sm mb-3">Based on typical growth patterns for {wizardData.businessType} businesses</p>
            <div className="space-y-2">
              {['Advanced Analytics', 'Customer Support Platform', 'Project Management'].map((tool) => (
                <div key={tool} className="border-2 border-cyan-400 p-3 flex items-center justify-between bg-white rounded-lg">
                  <span className="text-gray-800 font-medium text-sm">{tool}</span>
                  <span className="text-yellow-600 text-xs font-medium bg-yellow-50 px-2 py-1 rounded-full">In 6-12 months</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Enhanced Simulator Screen - WITH SCROLLABLE CONTENT
function SimulatorScreen({ wizardData, onBack }) {
  const [simTeamSize, setSimTeamSize] = useState(wizardData.teamSize);
  const [simBudget, setSimBudget] = useState(wizardData.budget || 'mid');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50"
    >
      {/* Header */}
      <div className="border-b-4 border-cyan-400 bg-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <Button onClick={onBack} className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 px-3 py-1.5 rounded-lg text-sm">
              <ChevronLeft size={16} className="mr-1.5" />
              Back to Dashboard
            </Button>
            <div className="text-xs text-gray-500">What-if analysis</div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
            <Settings className="text-yellow-600" size={20} />
          </div>
          <div>
            <h1 className="text-3xl text-yellow-600 font-bold">
              Scenario Simulator
            </h1>
            <p className="text-gray-600 text-sm">Adjust variables to see how your stack adapts</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-6">
            <div className="border-4 border-cyan-400 bg-gradient-to-br from-cyan-50 to-white p-6 rounded-xl shadow-sm">
              <Label className="text-gray-800 font-bold mb-4 block text-sm">Team Size: {simTeamSize}</Label>
              <Slider
                value={[simTeamSize]}
                onValueChange={([value]) => setSimTeamSize(value)}
                min={1}
                max={100}
                step={1}
              />
            </div>

            <div className="border-4 border-yellow-400 bg-gradient-to-br from-yellow-50 to-white p-6 rounded-xl shadow-sm">
              <Label className="text-gray-800 font-bold mb-4 block text-sm">Budget Level</Label>
              <div className="space-y-2">
                {['free', 'mid', 'premium'].map((budget) => (
                  <button
                    key={budget}
                    onClick={() => setSimBudget(budget)}
                    className={`w-full p-4 border-3 transition-all text-left rounded-xl text-sm ${
                      simBudget === budget
                        ? 'border-yellow-400 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-sm'
                        : 'border-gray-300 text-gray-700 hover:border-yellow-400 hover:bg-yellow-50'
                    }`}
                  >
                    <span className="font-semibold capitalize">{budget}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="border-4 border-cyan-400 bg-gradient-to-br from-cyan-50 to-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg text-cyan-600 font-bold mb-4 uppercase">Updated Stack Preview</h2>
            <p className="text-gray-600 text-sm mb-4">
              For a team of {simTeamSize} with {simBudget} budget:
            </p>
            <div className="space-y-3">
              {['CRM Tool', 'Marketing Platform', 'Analytics', 'Payment System'].map((tool) => (
                <div key={tool} className="border-2 border-cyan-400 p-3 bg-white rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800 font-medium text-sm">{tool}</span>
                    <span className="text-cyan-600 text-xs font-medium bg-cyan-50 px-2 py-1 rounded-full">Updated</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Enhanced Export Screen - WITH SCROLLABLE CONTENT
function ExportScreen({ wizardData, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50"
    >
      {/* Header */}
      <div className="border-b-4 border-cyan-400 bg-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <Button onClick={onBack} className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 px-3 py-1.5 rounded-lg text-sm">
              <ChevronLeft size={16} className="mr-1.5" />
              Back to Dashboard
            </Button>
            <div className="text-xs text-gray-500">Share your stack</div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
              <Download className="text-cyan-600" size={20} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl text-cyan-600 font-bold">
                Export Your Stack
              </h1>
              <p className="text-gray-600 text-sm">Save, share, or implement your personalized tech stack</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="border-4 border-cyan-400 bg-gradient-to-br from-cyan-50 to-white p-6 hover:scale-105 transition-transform cursor-pointer rounded-xl shadow-sm">
            <Download size={36} className="text-cyan-600 mb-3" />
            <h3 className="text-xl text-gray-800 font-bold mb-1.5">Download PDF</h3>
            <p className="text-gray-600 text-sm mb-3">Get a detailed report with all recommendations</p>
            <Button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-2 border-cyan-400 rounded-lg shadow-sm text-sm py-2">
              Download Now
            </Button>
          </div>

          <div className="border-4 border-yellow-400 bg-gradient-to-br from-yellow-50 to-white p-6 hover:scale-105 transition-transform cursor-pointer rounded-xl shadow-sm">
            <Share2 size={36} className="text-yellow-600 mb-3" />
            <h3 className="text-xl text-gray-800 font-bold mb-1.5">Share Link</h3>
            <p className="text-gray-600 text-sm mb-3">Get a shareable link to your stack</p>
            <Button className="w-full border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 rounded-lg text-sm py-2">
              Generate Link
            </Button>
          </div>
        </div>

        <div className="border-4 border-cyan-400 bg-gradient-to-br from-cyan-50 to-white p-6 text-center rounded-xl shadow-sm">
          <h3 className="text-xl text-cyan-600 font-bold mb-3">Need Implementation Help?</h3>
          <p className="text-gray-700 text-sm mb-4">
            Want experts to set up and integrate these tools for you?
          </p>
          <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white border-2 border-yellow-400 px-6 py-3 text-base rounded-lg shadow-sm">
            <Mail size={16} className="mr-1.5" />
            Request Implementation Quote
          </Button>
        </div>

        <div className="mt-6 text-center">
          <Button className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg text-sm">
            <RefreshCw size={16} className="mr-1.5" />
            Start Over
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Additional missing icon components
const Building2 = ({ className, size }) => <div className={className}>🏢</div>;
const Clock = ({ className, size }) => <div className={className}>⏰</div>;
const List = ({ className, size }) => <div className={className}>📋</div>;