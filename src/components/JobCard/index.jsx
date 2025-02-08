import { 
  Search, MapPin, Briefcase, Clock, 
  ChevronDown, ChevronUp, DollarSign, 
  PlusCircle, Building2, Users, Star, 
  Palette, Scissors, SparklesIcon, Layers, CheckCircle
} from 'lucide-react';

const Card = ({ children, className, style }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`} style={style}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className }) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

const CardTitle = ({ children, className }) => {
  return <h2 className={`font-semibold ${className}`}>{children}</h2>;
};

const CardContent = ({ children }) => {
  return <div className="p-6">{children}</div>;
};

const JobCard = ({ job, isExpanded, onToggleExpand }) => {
  return (
    <Card 
      className="hover:shadow-lg transition-shadow"
      style={{borderLeft: '4px solid #FF6B6B'}}
    >
      <CardHeader className="pb-0">
        <div className="flex justify-between items-start gap-6">
          <div className="space-y-4">
            <div>
              <CardTitle className="text-2xl mb-1 text-pink-600 transition-colors">
                {job.title}
              </CardTitle>
              <p className="text-gray-600">{job.company}</p>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-pink-500" />
                {/* {job.location} */}
                {job.city}, {job.distric} - {job.state}
              </div>
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2 text-purple-500" />
                {/* {job.type} */}
                {job.businessHour}

              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                {/* {job.businessHour} */}
              </div>
            </div>
          </div>
          
          <button className="hidden sm:block  bg-pink-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
            Postular Ahora
          </button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mt-4">
          <div className="space-y-4">
            <div className="text-gray-600">
              {isExpanded ? job.description : `${job.description.slice(0, 150)}...`}
            </div>

            <button
              onClick={onToggleExpand}
              className="mt-2 flex items-center gap-1 text-sm font-medium text-pink-600 hover:text-pink-800"
            >
              {isExpanded ? (
                <>Ver menos <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>Ver más <ChevronDown className="h-4 w-4" /></>
              )}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex flex-wrap gap-6">
              <span className="text-sm text-gray-600">
                💰 {job.salary || 'Salario a convenir'}
              </span>
              <span className="text-sm text-gray-600">
                👩‍💼 +{job.experience} años
              </span>
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                {job.hasCommission ? (
                  <span className="text-green-600" title={job.commissionDetails}>
                    Incluye comisiones
                  </span>
                ) : (
                  <span className="text-gray-500">Sin comisiones</span>
                )}
              </span>
            </div>
          </div>
        </div>
        <button className="block sm:hidden w-full mt-6  bg-pink-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
            Postular Ahora
          </button>
      </CardContent>
    </Card>
  );
};

export default JobCard;
