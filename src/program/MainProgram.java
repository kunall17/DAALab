package program;

import java.io.IOException;
import java.util.HashMap;

import jdk.nashorn.internal.scripts.JO;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.GenericOptionsParser;

public class MainProgram {
    public static void main(String args[])throws Exception{
        Configuration c=new Configuration();
        String[] files=new GenericOptionsParser(c,args).getRemainingArgs();
        Path input=new Path(files[0]),output=new Path(files[1]);
        Job j=new Job(c,"group");
        j.setJarByClass(MainProgram.class);
        j.setMapperClass(MapForGroup.class);
        j.setReducerClass(ReduceForGroup.class);
        j.setOutputKeyClass(Text.class);
        j.setOutputValueClass(Text.class);
        FileInputFormat.addInputPath(j,input);
        FileOutputFormat.setOutputPath(j,output);
        System.exit(j.waitForCompletion(true)?0:1);
    }
    public static class MapForGroup extends Mapper<LongWritable, Text, Text, Text>{
        @Override
        public void map(LongWritable key,Text value, Context context)throws IOException, InterruptedException{
            String line=value.toString();
            String words[]=line.split(",");
            int l=words.length;
            Text outputValue=new Text(words[0]);
            if(l>1){
                for(int i=1;i<l;i++){
                    Text outputKey=new Text(words[i].trim());
                    context.write(outputKey,outputValue);
                }
            }
        }
    }
    public static class ReduceForGroup extends Reducer<Text, Text, Text, Text>{
        @Override
        public void reduce(Text word, Iterable<Text> values,Context context) throws IOException, InterruptedException{
            String allValues="";
            HashMap<String, Integer> hashMap=new HashMap<String, Integer>();
            for(Text value : values){
                if(!hashMap.containsKey(value.toString())){
                    allValues+=","+value.toString();
                    hashMap.put(value.toString(),1);
                }

            }
            context.write(word,new Text(allValues));
        }
    }
}
