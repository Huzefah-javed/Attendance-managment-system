import {motion} from "motion/react"


export default function Card({ title, value,  className, headerClasses, childClasses }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}   
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
       
      className={`flex items-center justify-start rounded-2xl  shadow-md  shadow-gray-200 dark:shadow-gray-500 p-5 transition hover:shadow-lg ${className}`}>
      {/* Left section */}
      <div className="w-full">
        <motion.h3
       initial={{ opacity: 0 }}   
       animate={{ opacity: 1 }}
       transition={{ duration: 1, ease: "easeOut" }}
        className={`font-bold text-gray-500 ${headerClasses}`}
          >{title}</motion.h3>
        <motion.p
          
       initial={{ opacity: 0 }}   
       animate={{ opacity: 1 }}
       transition={{ duration: 1, ease: "easeOut" }}
         className={`w-full font-bold text-center p-3 ${childClasses}`}>{value ?? 0}</motion.p>
      </div>

    </motion.div>
  )
}
