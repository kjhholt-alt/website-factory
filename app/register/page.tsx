import { getConfig, getPrograms } from "@/lib/config";
import RegistrationForm from "@/components/forms/RegistrationForm";

export default function RegisterPage() {
  const config = getConfig();
  const programs = getPrograms();

  return (
    <div>
      {/* Page Header Banner */}
      <section className="gradient-primary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Register Your Child
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Complete the form below to enroll your child in a{" "}
            {config.business.name} program.
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RegistrationForm
            programs={programs}
            requireWaiver={config.registration.requireWaiver}
          />
        </div>
      </section>
    </div>
  );
}
